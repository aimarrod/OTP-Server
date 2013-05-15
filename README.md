OTP-Server
==========

OTP validaton server on Nodejs to use as a security demo alongside https://github.com/julen30/OTP-android

The application will consist on a server which will allow some user to register, and synchronize a android device. This device will be sync-ed with the user inputing some data that will be 
exposed by the server. The server will just read the OTP keys and resyn the device. The OTP generation algorithm will be the specified in http://tools.ietf.org/html/rfc4226
