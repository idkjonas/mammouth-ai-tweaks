// ==UserScript==
// @name         Jonas' Mammouth tweaks
// @namespace    http://jonas.tf/
// @version      1.1.5
// @description  Tweaks for mammouth.ai
// @author       Jonas
// @match        https://mammouth.ai/app/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=jonas.tf
// @grant        none
// ==/UserScript==

(function () {
    "use strict";

    // add query parameter functionality
  
    const qParam = new URL(window.location).searchParams.get("q");
  
    window.addEventListener("load", () => {
  
      if (qParam) {  
        let el = document.querySelector("textarea");
  
        checkForTextarea();
  
        function checkForTextarea() {
          el = document.querySelector('textarea[placeholder="Ask anything .."]');
          if (el == null) {
            setTimeout(() => {
              checkForTextarea();
            }, 10);
          } else {
            el.focus();
            el.value = qParam;
            el.dispatchEvent(new Event("input", { bubbles: true }));
  
            const btn = document.querySelector(
              "span.i-heroicons\\:arrow-right-circle-16-solid",
            ).parentNode;
  
            if (btn) {
              setTimeout(() => {
                btn.click();
              });
            } else {
              console.error("Button does not exist");
            }
          }
        }
      }
    });
  
    // make website appearance match system
  
    function setColorSchemeClass() {
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        document.documentElement.classList.remove("light");
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
        document.documentElement.classList.add("light");
      }
    }
  
    setColorSchemeClass();
  
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", setColorSchemeClass);
  })();
  
