# WP Reactivate

WP Reactivate is a React boilerplate built specifically for WordPress, allowing you to quickly and easily integrate React into your WordPress plugins.

## Setup and installation
* **Install [Node 4.0.0 or greater](https://nodejs.org)**
* **Install [Yarn](https://yarnpkg.com/en/docs/install)** (You can also use npm)

## Usage
* Install required modules: `yarn` (or `npm install`)
* Build development version of app and watch for changes: `yarn build` (or `npm run build`)
* Build production version of app:`yarn prod` (or `npm run prod`)

## Quick Start
### Introduction
The boilerplate plugin provides three different WordPress views in which an independant React app can be rendered. Namely:

- Settings page in the backend (wp-admin).
- Shortcode.
- Widget

Each JavaScript root file will correspond to the independant React app to be bundled by Webpack.

*webpack.config.js*
```javascript =6
entry: {
  'js/admin': path.resolve(__dirname, 'app/admin.js'),
  'js/shortcode': path.resolve(__dirname, 'app/shortcode.js'),
  'js/widget': path.resolve(__dirname, 'app/widget.js'),
},
```
  
### Using the Shortcode
In order to get the shortcode attributes into our Javascript we need to pass them to an object which will be made available to the *shortcode.js* app via ```wp_localize_script```. Be careful with the security of data you pass here as this will be output in a ```<script>``` tag in the rendered html.
  
*includes/class-wpr-shortcode.php*
```php =79
public function shortcode( $atts ) {
  wp_enqueue_script( $this->plugin_slug . '-shortcode-script' );
  wp_enqueue_style( $this->plugin_slug . '-shortcode-style' );

  $object = shortcode_atts( array(
    'title'       => 'Hello world',
  ), $atts, 'wp-reactivate' );

  wp_localize_script( $this->plugin_slug . '-shortcode-script', 'wpr_object', $object );

  ?><div id="wp-reactivate-shortcode"></div><?php
}
```

### Using the Widget
In order to get the widget options into our Javascript we need to pass them to an object which will be made available to the *widget.js* app via ```wp_localize_script```. Be careful with the security of data you pass here as this will be output in a ```<script>``` tag in the rendered html.
  
*includes/class-wpr-widget.php*
```php =41
public function widget( $args, $instance ) {
  wp_enqueue_script( $this->plugin_slug . '-widget-script', plugins_url( 'assets/js/widget.js', dirname( __FILE__ ) ), array( 'jquery' ), $this->version );

  $object = array(
    'title'       => $instance['title'],
  );

  wp_localize_script( $this->plugin_slug . '-widget-script', 'wpr_object', $object );

  echo $args['before_widget'];

  ?><div id="wp-reactivate-widget"></div><?php

  echo $args['after_widget'];
}
```

## Technologies
| **Tech** | **Description** |
|----------|-------|
|  [React](https://facebook.github.io/react/)  |   A JavaScript library for building user interfaces. |
|  [Babel](http://babeljs.io) |  Compiles next generation JS features to ES5. Enjoy the new version of JavaScript, today. |
| [Webpack](http://webpack.js.org) | For bundling our JavaScript assets. |
| [ESLint](http://eslint.org/)| Pluggable linting utility for JavaScript and JSX  |

## Credits
*Created by [Pangolin](https://gopangolin.com)*