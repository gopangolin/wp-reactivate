<?php

class WPReactivate_REST_Controller {
    /**
	 * Instance of this class.
	 *
	 * @since    0.8.1
	 *
	 * @var      object
	 */
	protected static $instance = null;

	/**
	 * Initialize the plugin by setting localization and loading public scripts
	 * and styles.
	 *
	 * @since     0.8.1
	 */
	private function __construct() {
	}

    /**
     * Set up WordPress hooks and filters
     *
     * @return void
     */
    public function do_hooks() {
        add_action( 'rest_api_init', array( $this, 'register_routes' ) );
    }

	/**
	 * Return an instance of this class.
	 *
	 * @since     0.8.1
	 *
	 * @return    object    A single instance of this class.
	 */
	public static function get_instance() {

		// If the single instance hasn't been set, set it now.
		if ( null == self::$instance ) {
			self::$instance = new self;
			self::$instance->do_hooks();
		}

		return self::$instance;
	}

    /**
     * Register the routes for the objects of the controller.
     */
    public function register_routes() {
        $version = '1';
        $namespace = 'wp-reactivate/v' . $version;

        register_rest_route( $namespace, '/settings/', array(
            array(
                'methods'               => WP_REST_Server::READABLE,
                'callback'              => array( $this, 'get_settings' ),
                'permission_callback'   => array( $this, 'setting_permissions_check' ),
                'args'                  => array(),
            ),
        ) );

        register_rest_route( $namespace, '/settings/', array(
            array(
                'methods'               => WP_REST_Server::CREATABLE,
                'callback'              => array( $this, 'update_settings' ),
                'permission_callback'   => array( $this, 'setting_permissions_check' ),
                'args'                  => array(),
            ),
        ) );

    }

    /**
     * Get Settings
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|WP_REST_Request
     */
    public function get_settings( $request ) {
        $data = array(
            'wpreactivate' => get_option('wpreactivate'),
        );

        return new WP_REST_Response( $data, 200 );
    }
    
    /**
     * Update Settings
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|WP_REST_Request
     */
    public function update_settings( $request ) {
        update_option('wpreactivate', $request->get_param('wpreactivate'));
        return new WP_REST_Response( true, 200 );
    }

    /**
     * Check if a given request has access to update a setting
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|bool
     */
    public function setting_permissions_check( $request ) {
        return current_user_can( 'manage_options' );
    }
}
