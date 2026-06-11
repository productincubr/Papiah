import { supabase } from "../../config/supabase.js";

/**
 * Creates a new product, including optional images, features, and specifications.
 */
export const createProduct = async (productData) => {
  const {
    title,
    slug,
    shortDescription,
    description,
    sku,
    categoryId,
    collectionId,
    price,
    comparePrice,
    costPrice,
    stock,
    weight,
    coverImage,
    status,
    isFeatured,
    isBestseller,
    isNew,
    seoTitle,
    seoDescription,
    images, // array of strings (URLs)
    features, // array of { icon, title, description }
    specifications, // array of { key, value }
  } = productData;

  // 1. Insert product
  const { data: product, error: productError } = await supabase
    .from("products")
    .insert([
      {
        title,
        slug,
        short_description: shortDescription,
        description,
        sku,
        category_id: categoryId || null,
        collection_id: collectionId || null,
        price,
        compare_price: comparePrice,
        cost_price: costPrice,
        stock: stock !== undefined ? stock : 0,
        weight,
        cover_image: coverImage,
        status: status || "draft",
        is_featured: isFeatured !== undefined ? isFeatured : false,
        is_bestseller: isBestseller !== undefined ? isBestseller : false,
        is_new: isNew !== undefined ? isNew : true,
        seo_title: seoTitle,
        seo_description: seoDescription,
      },
    ])
    .select()
    .single();

  if (productError) throw productError;

  const productId = product.id;

  // 2. Insert gallery images if provided
  if (images && images.length > 0) {
    const imagesToInsert = images.map((url, index) => ({
      product_id: productId,
      image_url: url,
      sort_order: index,
    }));
    const { error: imgError } = await supabase.from("product_images").insert(imagesToInsert);
    if (imgError) throw imgError;
  }

  // 3. Insert features if provided
  if (features && features.length > 0) {
    const featuresToInsert = features.map((f) => ({
      product_id: productId,
      icon: f.icon,
      title: f.title,
      description: f.description,
    }));
    const { error: featError } = await supabase.from("product_features").insert(featuresToInsert);
    if (featError) throw featError;
  }

  // 4. Insert specifications if provided
  if (specifications && specifications.length > 0) {
    const specsToInsert = specifications.map((s) => ({
      product_id: productId,
      key: s.key,
      value: s.value,
    }));
    const { error: specError } = await supabase.from("product_specifications").insert(specsToInsert);
    if (specError) throw specError;
  }

  return getProductById(productId);
};

/**
 * Gets product details by ID, including nested category, collection, images, features, and specifications.
 */
export const getProductById = async (id) => {
  const { data: product, error } = await supabase
    .from("products")
    .select(`
      *,
      categories (*),
      collections (*),
      product_images (*),
      product_features (*),
      product_specifications (*)
    `)
    .eq("id", id)
    .single();

  if (error) throw error;
  return product;
};

/**
 * Gets product details by Slug, including nested assets.
 */
export const getProductBySlug = async (slug) => {
  const { data: product, error } = await supabase
    .from("products")
    .select(`
      *,
      categories (*),
      collections (*),
      product_images (*),
      product_features (*),
      product_specifications (*)
    `)
    .eq("slug", slug)
    .single();

  if (error) throw error;
  return product;
};

/**
 * Retrieves all products.
 */
export const getAllProducts = async () => {
  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      categories (*),
      collections (*)
    `)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

/**
 * Updates a product and optionally updates its child components (images, features, specs).
 */
export const updateProduct = async (id, updateFields) => {
  const mappedFields = {};
  const allowedKeys = [
    "title", "slug", "description", "shortDescription", "sku", 
    "price", "comparePrice", "costPrice", "stock", "weight", 
    "coverImage", "status", "isFeatured", "isBestseller", "isNew", 
    "seoTitle", "seoDescription"
  ];

  allowedKeys.forEach(key => {
    if (updateFields[key] !== undefined) {
      // Convert camelCase to snake_case for DB fields
      let dbKey = key.replace(/([A-Z])/g, "_$1").toLowerCase();
      if (key === "shortDescription") dbKey = "short_description";
      if (key === "comparePrice") dbKey = "compare_price";
      if (key === "costPrice") dbKey = "cost_price";
      if (key === "coverImage") dbKey = "cover_image";
      if (key === "isFeatured") dbKey = "is_featured";
      if (key === "isBestseller") dbKey = "is_bestseller";
      if (key === "isNew") dbKey = "is_new";
      if (key === "seoTitle") dbKey = "seo_title";
      if (key === "seoDescription") dbKey = "seo_description";

      mappedFields[dbKey] = updateFields[key];
    }
  });

  if (updateFields.categoryId !== undefined) mappedFields.category_id = updateFields.categoryId || null;
  if (updateFields.collectionId !== undefined) mappedFields.collection_id = updateFields.collectionId || null;

  const { error } = await supabase
    .from("products")
    .update(mappedFields)
    .eq("id", id);

  if (error) throw error;

  // Handle updates for nested fields if provided
  if (updateFields.images !== undefined) {
    await supabase.from("product_images").delete().eq("product_id", id);
    if (updateFields.images.length > 0) {
      const imagesToInsert = updateFields.images.map((url, index) => ({
        product_id: id,
        image_url: url,
        sort_order: index,
      }));
      await supabase.from("product_images").insert(imagesToInsert);
    }
  }

  if (updateFields.features !== undefined) {
    await supabase.from("product_features").delete().eq("product_id", id);
    if (updateFields.features.length > 0) {
      const featuresToInsert = updateFields.features.map(f => ({
        product_id: id,
        icon: f.icon,
        title: f.title,
        description: f.description,
      }));
      await supabase.from("product_features").insert(featuresToInsert);
    }
  }

  if (updateFields.specifications !== undefined) {
    await supabase.from("product_specifications").delete().eq("product_id", id);
    if (updateFields.specifications.length > 0) {
      const specsToInsert = updateFields.specifications.map(s => ({
        product_id: id,
        key: s.key,
        value: s.value,
      }));
      await supabase.from("product_specifications").insert(specsToInsert);
    }
  }

  return getProductById(id);
};

/**
 * Deletes a product.
 */
export const deleteProduct = async (id) => {
  const { data, error } = await supabase
    .from("products")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Fetches featured products.
 */
export const getFeaturedProducts = async () => {
  const { data, error } = await supabase
    .from("products")
    .select("*, categories(*), collections(*)")
    .eq("is_featured", true)
    .eq("status", "active");

  if (error) throw error;
  return data;
};

/**
 * Fetches bestseller products.
 */
export const getBestSellerProducts = async () => {
  const { data, error } = await supabase
    .from("products")
    .select("*, categories(*), collections(*)")
    .eq("is_bestseller", true)
    .eq("status", "active");

  if (error) throw error;
  return data;
};

/**
 * Fetches new products.
 */
export const getNewProducts = async () => {
  const { data, error } = await supabase
    .from("products")
    .select("*, categories(*), collections(*)")
    .eq("is_new", true)
    .eq("status", "active");

  if (error) throw error;
  return data;
};

/**
 * Advanced search, filtering, and sorting of products (Filter/Search Service).
 */
export const queryProducts = async ({
  search,
  category, // slug or ID
  collection, // slug or ID
  minPrice,
  maxPrice,
  isNew,
  isBestseller,
  isFeatured,
  sort, // latest, priceLowHigh, priceHighLow, featured
}) => {
  let query = supabase.from("products").select("*, categories(*), collections(*)");

  // Standard filters
  query = query.eq("status", "active");

  if (isFeatured !== undefined) query = query.eq("is_featured", isFeatured);
  if (isBestseller !== undefined) query = query.eq("is_bestseller", isBestseller);
  if (isNew !== undefined) query = query.eq("is_new", isNew);

  if (minPrice) query = query.gte("price", parseFloat(minPrice));
  if (maxPrice) query = query.lte("price", parseFloat(maxPrice));

  if (search) {
    query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
  }

  // Filter by category slug or ID
  if (category) {
    // Check if it's a UUID
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(category);
    if (isUuid) {
      query = query.eq("category_id", category);
    } else {
      // Query categories table first to find ID
      const { data: catData } = await supabase.from("categories").select("id").eq("slug", category).single();
      if (catData) {
        query = query.eq("category_id", catData.id);
      }
    }
  }

  // Filter by collection slug or ID
  if (collection) {
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(collection);
    if (isUuid) {
      query = query.eq("collection_id", collection);
    } else {
      const { data: collData } = await supabase.from("collections").select("id").eq("slug", collection).single();
      if (collData) {
        query = query.eq("collection_id", collData.id);
      }
    }
  }

  // Sorting
  if (sort === "priceLowHigh") {
    query = query.order("price", { ascending: true });
  } else if (sort === "priceHighLow") {
    query = query.order("price", { ascending: false });
  } else if (sort === "featured") {
    query = query.order("is_featured", { ascending: false }).order("created_at", { ascending: false });
  } else {
    // default/latest
    query = query.order("created_at", { ascending: false });
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
};

/**
 * ============================================================================
 * Inventory Service
 * ============================================================================
 */

/**
 * Checks if a product has sufficient stock.
 */
export const checkStock = async (productId, quantity) => {
  const { data, error } = await supabase
    .from("products")
    .select("stock, title")
    .eq("id", productId)
    .single();

  if (error) throw error;
  if (!data) throw new Error("Product not found");

  return {
    inStock: data.stock >= quantity,
    currentStock: data.stock,
    title: data.title
  };
};

/**
 * Decreases the stock of a product by a specified quantity.
 */
export const decreaseStock = async (productId, quantity) => {
  const { data: product, error: fetchError } = await supabase
    .from("products")
    .select("stock")
    .eq("id", productId)
    .single();

  if (fetchError) throw fetchError;
  if (product.stock < quantity) {
    throw new Error(`Insufficient stock for product. Available: ${product.stock}, Requested: ${quantity}`);
  }

  const newStock = product.stock - quantity;
  const { data, error } = await supabase
    .from("products")
    .update({ stock: newStock })
    .eq("id", productId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Increases the stock of a product by a specified quantity.
 */
export const increaseStock = async (productId, quantity) => {
  const { data: product, error: fetchError } = await supabase
    .from("products")
    .select("stock")
    .eq("id", productId)
    .single();

  if (fetchError) throw fetchError;

  const newStock = product.stock + quantity;
  const { data, error } = await supabase
    .from("products")
    .update({ stock: newStock })
    .eq("id", productId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Marks a product as out of stock (sets stock to 0).
 */
export const markOutOfStock = async (productId) => {
  const { data, error } = await supabase
    .from("products")
    .update({ stock: 0 })
    .eq("id", productId)
    .select()
    .single();

  if (error) throw error;
  return data;
};
