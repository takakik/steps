jQuery Steps Plugin 
============

A simple jQuery wizard plugin that supports Mobile Browser.

## Getting Started

**jQuery Steps** is a lightweight wizard UI component written for **jQuery**.

Everything you need to start is:

1. Include **jQuery** and **jQuery Steps** in your HTML code.
2. Then select an element represents the wizard and call the `steps` method.

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Demo</title>
        <meta charset="utf-8">
        <link href="jquery.steps.css" rel="stylesheet">

        <script src="jquery.js"></script> 
        <script src="jquery.easing.js"></script> 
        <script src="jquery.steps.js"></script>
    </head>
    <body>
        <div id="wizard"></div>
        <script>
            $("#wizard").steps();
        </script>
    </body>
</html>
```

> For more information [check the documentation](https://takakik.github.io/steps/).

### How to add initial steps?

There are two ways to add steps and their corresponding content.

1. Add HTML code into the representing wizard element.

```html
<div id="wizard">
    <h1>First Step</h1>
    <div>First Content</div>

    <h1>Second Step</h1>
    <div>Second Content</div>
</div>
```

2. Or use the API to add steps dynamically.

```javascript
// Initialize wizard
var wizard = $("#wizard").steps();

// Add step
wizard.steps("add", {
    title: "HTML code", 
    content: "<strong>HTML code</strong>"
});
```

> For more samples [check the demos](https://takakik.github.io/steps/).

## Reporting an Issue

Instructions will follow soon!

## Contributing

Instructions will follow soon!

## License

Copyright (c) 2013 Takaki.k Licensed under the [MIT license](https://takakik.github.io/steps/).
