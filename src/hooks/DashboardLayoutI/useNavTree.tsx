import { useState, useEffect, useCallback } from "react";

export function useNavTree(initialItem: string, localStorageKey: string) {
  const [navTree, setNavTree] = useState<string[]>(() => {
    const savedTree = localStorage.getItem(localStorageKey);
    return savedTree ? JSON.parse(savedTree) : [initialItem];
  });

  console.log(navTree);

  // The active view is always the last item in the stack
  const navTreeCurrent = navTree[navTree.length - 1];

  // Call this to move forward to a new screen
  const navTreeAppend = useCallback((item: string) => {
    setNavTree((prev) => {
      // Prevent duplicate entries if the user double-clicks
      if (prev[prev.length - 1] === item) return prev;

      const newTree = [...prev, item];
      // Create a new entry in browser history
      window.history.pushState({ step: item }, "");
      return newTree;
    });
  }, []);

  // Programmatically go back (triggers popstate)
  const navTreePop = useCallback(() => {
    if (navTree.length > 1) {
      window.history.back();
    }
  }, [navTree.length]);

  useEffect(() => {
    const handlePopState = () => {
      // If the user hits the browser back button
      if (navTree.length > 1) {
        setNavTree((prev) => prev.slice(0, -1));
      }
    };

    window.addEventListener("popstate", handlePopState);

    localStorage.setItem(localStorageKey, JSON.stringify(navTree));
    return () => window.removeEventListener("popstate", handlePopState);
  }, [navTree.length]);

  return {
    navTreeCurrent,
    navTreeAppend,
    navTreePop,
    navTreeCanPop: navTree.length > 1,
  };
}
