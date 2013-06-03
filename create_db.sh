if [ $# != 1 -a $# != 2 ]; then
	echo "Usage: ./create_db mysql_username [mysql_password]"
	exit
fi
mysql -u $1 -p $2 << EOF

CREATE DATABASE otp;

USE otp;

CREATE TABLE users(
	name VARCHAR(255),
	passphrase VARCHAR(255),
	counter INTEGER
);

EOF


