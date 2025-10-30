(function () {
  const utmKeys = ['utm_source', 'utm_medium'];

  // Capture UTM parameters from the URL and store them
  const params = new URLSearchParams(window.location.search);
  utmKeys.forEach(key => {
    const value = params.get(key);
    if (value) {
      sessionStorage.setItem(key, value);
    }
  });

  // On DOM ready, populate existing hidden UTM fields in the Webform
  document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form.webform-submission-form");
    if (form) {
      utmKeys.forEach(function (key) {
        const field = form.querySelector(`[name="${key}"]`);
        if (field) {
          const storedValue = sessionStorage.getItem(key);
          if (storedValue) {
            field.value = storedValue;
          }
        }
      });
    }
  });

  // On Webform confirmation page, redirect with stored UTM values
  if (window.location.pathname.includes("/form/")) {
    document.addEventListener("submit", function () {
      setTimeout(function () {
        const storedParams = utmKeys
          .map(function (key) {
            const value = sessionStorage.getItem(key);
            return value ? key + "=" + encodeURIComponent(value) : "";
          })
          .filter(Boolean)
          .join("&");

        const studyNumber = params.get("study_number") || "";

        // Map form path to thank-you page
        const redirectMap = {
          '/form/en':  '/thank-you-clinical-trials',
          '/form/jp':  '/jp/thank-you-japanese-clinical-trials',
          '/form/es':  '/thank-you-clinical-trials-es',
          '/form/zht': '/thank-you-chinese-clinical-trials-zh-cht',
          '/form/zhs': '/thank-you-chinese-clinical-trials-zh-chs'
        };

        // Find matching redirect base
        const baseUrl = Object.entries(redirectMap).find(function ([path]) {
          return window.location.pathname.includes(path);
        })?.[1] || '/thank-you-clinical-trials'; // fallback

        const redirectUrl =
          baseUrl +
          "?study_number=" +
          encodeURIComponent(studyNumber) +
          (storedParams ? "&" + storedParams : "");

        window.location.href = redirectUrl;
      }, 500); // Delay to allow form submission
    }, true);
  }
})();
