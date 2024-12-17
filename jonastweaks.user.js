// ==UserScript==
// @name         Jonas' Mammouth tweaks
// @namespace    http://jonas.tf/
<<<<<<< HEAD
// @version      1.1
=======
// @version      1.0.1
>>>>>>> cd77b8251d4361768b24f9dae4c8870905c2830b
// @description  Tweaks for mammouth.ai
// @author       Jonas
// @match        https://mammouth.ai/app/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=jonas.tf
// @grant        none
// ==/UserScript==

(function() {
    "use strict";

    const qParam = new URL(window.location).searchParams.get("q");

    window.addEventListener("load", (event) => {
        injectCSS();

        // add query parameter functionality

        if (qParam) {
            let foundElement = false;

            let el = document.querySelector("textarea");

            checkForTextarea();

            function checkForTextarea() {
                el = document.querySelector('textarea[placeholder="Ask anything .."]');
                if (el == null) {
                    setTimeout(() => {
                        checkForTextarea()
                    }, 10)
                } else {
                    el.focus();
                    el.value = qParam;
                    el.dispatchEvent(new Event('input', { bubbles: true }));

                    const btn = document.querySelector("span.i-heroicons\\:arrow-right-circle-16-solid").parentNode;

                    if (btn) {
                        setTimeout(() => {
                            btn.click();
                        })
                    } else {
                        console.error("Button does not exist")
                    }

                }
            }



        }
    });

    // fix text window width

    const customCss = `
<<<<<<< HEAD
        @media (min-width: 700px) {
            div.grow.overflow-auto.scrollable.flex.flex-col.gap-4 {
                width: 700px;
                margin-inline: auto;
            }
=======
@media (min-width: 700px) {
    div.grow.overflow-auto.scrollable.flex.flex-col.gap-4 {
        width: 700px;
        margin-inline: auto;
    }

    div.w-full.relative:has(div.relative.outline-1) {
        width: 700px;
        margin-inline: auto;
    }
}
`;
>>>>>>> cd77b8251d4361768b24f9dae4c8870905c2830b

            div.w-full.relative:has(div.relative.outline-1) {
                width: 700px;
                margin-inline: auto;
            }
        }
    `;

    function injectCSS() {
        if (!document.querySelector("[jonas-tweaks]")) {
            const elStyleSheet = document.createElement("style");
            elStyleSheet.setAttribute("jonas-tweaks", "");
            elStyleSheet.textContent = customCss;
            document.head.append(elStyleSheet);
        }
    }

    // window.addEventListener("load", injectCSS);

    injectCSS();

    // add copy message button to bot replies

    function addButtonToMessage(messageElement) {
        if (messageElement.querySelector(".copy-btn")) return;

        const button = document.createElement("button");
        const initialText = "Copy";
        button.className = "my-custom-button";
        button.textContent = initialText;
        button.className = "focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-md text-sm gap-x-1.5 px-2.5 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 text-gray-900 dark:text-white bg-white hover:bg-gray-50 disabled:bg-white dark:bg-gray-900 dark:hover:bg-gray-800/50 dark:disabled:bg-gray-900 focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center"
        button.onclick = () => {
            button.textContent = "";
            navigator.clipboard.writeText(button.parentNode.textContent.replace("■", "").trim());
            button.textContent = "✓ Copied";
            setTimeout(() => {
                button.textContent = initialText;
            }, 1000)

        };

        messageElement.appendChild(button);
    }

    const selector = ".message_1df2:is(.anthropic, .groq, .openai, .mistral, .google, .xai)"

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === 1 && node.matches(selector)) {
                    addButtonToMessage(node);
                }

                if (node.nodeType === 1) {
                    node.querySelectorAll(selector).forEach(addButtonToMessage);
                }
            });
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });


    // make website appearance match system

    function setColorSchemeClass() {
        if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
            document.documentElement.classList.remove("light");
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
            document.documentElement.classList.add("light");
        }
    }

    setColorSchemeClass();

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", setColorSchemeClass);
})();
