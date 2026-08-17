// Patches window.history.pushState exactly once (module-level side effect,
// so it can't be re-applied/torn down by a component's mount/unmount cycle)
// and broadcasts a custom event any component can listen to for client-side
// navigation, instead of every component monkey-patching pushState itself.
export const LOCATION_CHANGE_EVENT = "papiah:locationchange";

declare global {
  interface History {
    __papiahPatched?: boolean;
  }
}

if (typeof window !== "undefined" && !window.history.__papiahPatched) {
  const originalPushState = window.history.pushState.bind(window.history);

  window.history.pushState = function (...args: Parameters<History["pushState"]>) {
    originalPushState(...args);
    window.dispatchEvent(new Event(LOCATION_CHANGE_EVENT));
  };

  window.addEventListener("popstate", () => {
    window.dispatchEvent(new Event(LOCATION_CHANGE_EVENT));
  });

  window.history.__papiahPatched = true;
}
