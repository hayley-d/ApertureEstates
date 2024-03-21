<?php
class DatabaseSingleton {
    private static $instance;
    private $connection;

    private function __construct() {
        // Private constructor to prevent instantiation
        $db_host = 'wheatley.cs.up.ac.za';
        $db_user = 'u21528790';
        $db_password = 'PZDCFBWEINHDQGCRKL764SCEKQ7YACKO';
        $db_name = 'u21528790';

        // Create a new MySQLi connection
        $this->connection = new mysqli($db_host, $db_user, $db_password, $db_name);

        // Check the connection
        if ($this->connection->connect_error) {
            die('Connection failed: ' . $this->connection->connect_error);
        }

        // Set MySQLi attributes
        $this->connection->set_charset('utf8');
    }

    //checks if an instance of the class exists already and if not creates a new instance.
    public static function getInstance() {
        if (!isset(self::$instance)) {
            self::$instance = new self();
        }

        return self::$instance->connection;
    }


}
global $db;
$db = DatabaseSingleton::getInstance();

$GLOBALS['db'] = $db;

?>



