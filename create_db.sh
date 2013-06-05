if [ $# != 1 -a $# != 2 ]; then
	echo "Usage: ./create_db mysql_username [mysql_password]"
	exit
fi
mysql -u $1 -p$2 << EOF

DROP DATABASE IF EXISTS otp;

CREATE DATABASE otp;

USE otp;

CREATE TABLE users(
	name VARCHAR(255) PRIMARY KEY,
	pass VARCHAR(255),
    seed VARCHAR(255),
	sequence_number INT
);

EOF


