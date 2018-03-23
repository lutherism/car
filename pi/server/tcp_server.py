#!/usr/bin/env python
import RPi.GPIO as GPIO
import video_dir
import car_dir
import motor
from time import ctime          # Import necessary modules
import SocketServer
import SimpleHTTPServer
from urlparse import urlparse

ctrl_cmd = ['forward', 'backward', 'left', 'right', 'stop', 'read cpu_temp', 'home', 'distance', 'x+', 'x-', 'y+', 'y-', 'xy_home']

busnum = 1          # Edit busnum to 0, if you uses Raspberry Pi 1 or 0

HOST = ''           # The variable of HOST is null, so the function bind( ) can be bound to all valid addresses.
PORT = 9090
ADDR = (HOST, PORT)

video_dir.setup(busnum=busnum)
car_dir.setup(busnum=busnum)
motor.setup(busnum=busnum)     # Initialize the Raspberry Pi GPIO connected to the DC motor.
video_dir.home_x_y()
car_dir.home()

class CustomHandler(SimpleHTTPServer.SimpleHTTPRequestHandler):
    def do_POST(self):
        #Sample values in self for URL: http://localhost:9090/jsxmlrpc-0.3/
        #self.path  '/jsxmlrpc-0.3/'
        #self.raw_requestline   'GET /jsxmlrpc-0.3/ HTTP/1.1rn'
        #self.client_address    ('127.0.0.1', 3727)

    # Split get request up into components
    req = urlparse(self.path)

    # If requesting for /move
    if req.path =='/turn':
            #This URL will trigger our sample function and send what it returns back to the browser
            self.send_response(200)
            self.send_header('Content-type','applicaiton/json')
            self.end_headers()

            return
	elif req.path == '/setMotors':
		self.send_response(200)
		self.send_header('Content-type','applicaiton/json')
		self.end_headers()

    # Else if requesting /endpoint
    elif req.path == '/endpoint':
        # Print request query
        print req.query
        # Do other stuffs...

httpd = SocketServer.ThreadingTCPServer(('localhost', PORT),CustomHandler)

print "serving at port", PORT
httpd.serve_forever()
