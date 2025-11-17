import React from "react";

export default function Footer() {
  return (
    <footer className="mt-16 py-8 bg-gray-900 dark:bg-black text-gray-300">
      <div className="container-max text-center">
        <p>© {new Date().getFullYear()} Frontlines Media · All Rights Reserved</p>
      </div>
    </footer>
  );
}
