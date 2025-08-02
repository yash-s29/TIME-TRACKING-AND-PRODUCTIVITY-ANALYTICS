import React from "react";

function Footer() {
    return (
        <footer className="bg-white dark:bg-gray-900 text-center py-4 border-t border-gray-200 dark:border-gray-700 shadow-sm">
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                © {new Date().getFullYear()} <span className="font-semibold">Browser Activity Tracker</span> — All rights reserved
            </p>
        </footer>
    );
}

export default Footer;
