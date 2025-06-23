(() => {
  const script = document.currentScript;
  console.log("Loader file loaded")
    const hostname = window.location.hostname;
  if (hostname) {
    console.log("hostname", hostname);
  }
  
  // const URL = "https://ai-chatbot-2honfku3e-chin-weis-projects.vercel.app";
  // const URL = "https://ai-chatbot-ajpxv3mti-chin-weis-projects.vercel.app";
    const URL = "http://localhost:3000/query";
  const loadWidget = () => {
    const widget = document.createElement("div");

    const widgetStyle = widget.style;
    widgetStyle.boxSizing = "border-box";
    widgetStyle.width = "400px";           // Set fixed size, or change to % if you want responsiveness
    widgetStyle.height = "600px";
    widgetStyle.position = "fixed";        // Changed to 'fixed' to always float relative to viewport
    widgetStyle.bottom = "40px";
    widgetStyle.right = "40px";
    widgetStyle.zIndex = "9999";           // Ensure it's above other content
    widgetStyle.display = "none";          // Hidden by default
    widgetStyle.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
    widgetStyle.borderRadius = "10px";
    widgetStyle.overflow = "hidden";       // Clip any overflowing iframe content
    widgetStyle.backgroundColor = "#000000";  // Optional: prevent background gaps

    const iframe = document.createElement("iframe");

    const iframeStyle = iframe.style;
    // iframeStyle.boxSizing = "border-box";
    // iframeStyle.position = "absolute";
    // iframeStyle.top = "0";
    // iframeStyle.left = "0";
    // iframeStyle.width = "30%";
    // iframeStyle.height = "100%";
    // iframeStyle.border = "none";
    // iframeStyle.margin = "0";
    // iframeStyle.padding = "0";
    iframeStyle.boxSizing = "border-box";
    iframeStyle.position = "absolute";
    iframeStyle.right = 0;
    iframeStyle.top = 0;
    iframeStyle.bottom = 10;
    iframeStyle.width = "100%";
    iframeStyle.height = "100%";
    iframeStyle.border = 0;
    iframeStyle.margin = 0;
    iframeStyle.padding = 0;
    iframeStyle.width = "600px"; //width

    widget.appendChild(iframe);

    const greeting = script.getAttribute("data-greeting");
    if (greeting) {
      console.log("greeting", greeting);
    }
    
    const api = {
      sendMessage: (message) => {
        iframe.contentWindow.postMessage(
          {
            sendMessage: message,
          },
          URL
        );
      },

      show: () => {
        widget.style.display = "block";
      },

      hide: () => {
        widget.style.display = "none";
      },

      toggle: () => {
        const display = window.getComputedStyle(widget, null).display;
        widget.style.display = display === "none" ? "block" : "none";
      },

      onHide: () => {},
    };

    iframe.addEventListener("load", () => {
      window.addEventListener("getWidgetApi", () => {
        const event = new CustomEvent("widgetApi", { detail: api });
        window.dispatchEvent(event);
      });

      window.addEventListener("message", (evt) => {
        if (evt.origin !== URL) {
          return;
        }

        if (evt.data === "hide") {
          api.hide();
          api.onHide();
        }
      });

      iframe.contentWindow.postMessage({ greeting }, URL);
      widgetStyle.display = "block";
    });

    const license = script.getAttribute("data-license");
    if (license) {
      console.log("license", license);
    }
    
    // const widgetUrl = `http://localhost:3000?license=${license}`;
    const widgetUrl = `${URL}?license=${license}`;
    iframe.src = widgetUrl;

    document.body.appendChild(widget);

    // Create the toggle button
    const toggleButton = document.createElement("button");
    toggleButton.textContent = "Toggle Widget";
    const buttonStyle = toggleButton.style;
    buttonStyle.position = "absolute";
    buttonStyle.bottom = "10px";
    buttonStyle.right = "40px";
    buttonStyle.padding = "10px 20px";
    buttonStyle.backgroundColor = "#007bff";
    buttonStyle.color = "#fff";
    buttonStyle.border = "none";
    buttonStyle.borderRadius = "5px";
    buttonStyle.cursor = "pointer";

    // Attach click event to toggle the widget
    toggleButton.addEventListener("click", () => {
      api.toggle();
    });

    // Append the button to the body
    document.body.appendChild(toggleButton);
  };

  if (document.readyState === "complete") {
    loadWidget();
  } else {
    document.addEventListener("readystatechange", () => {
      if (document.readyState === "complete") {
        loadWidget();
      }
    });
  }
})();
