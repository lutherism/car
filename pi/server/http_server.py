#!/usr/bin/env python
import RPi.GPIO as GPIO
import video_dir
import car_dir
import motor
from time import ctime          # Import necessary modules
from urlparse import urlparse
from BaseHTTPServer import BaseHTTPRequestHandler,HTTPServer
from SocketServer import ThreadingMixIn
import threading
import argparse
import re
import cgi

busnum = 1          # Edit busnum to 0, if you uses Raspberry Pi 1 or 0

HOST = ''           # The variable of HOST is null, so the function bind( ) can be bound to all valid addresses.
PORT = 9090
ADDR = (HOST, PORT)

video_dir.setup(busnum=busnum)
car_dir.setup(busnum=busnum)
motor.setup(busnum=busnum)     # Initialize the Raspberry Pi GPIO connected to the DC motor.
video_dir.home_x_y()
car_dir.home()

class LocalData(object):
      records = {}

class HTTPRequestHandler(BaseHTTPRequestHandler):
  def do_POST(self):
      req = urlparse(self.path)

      if req.path == re.search('/turn', self.path):
          car_dir.turn(req.body.angle)
      elif req.path == re.search('/motors', self.path):
          if req.body.forward == True:
              motor.forward()
          elif req.body.backward == True:
              motor.forward()
          elif req.body.stop == True:
              motor.forward()
      elif req.path == re.search('/speed', self.path):
          motor.setSpeed(req.body.speed)

      self.send_response(200)
      self.send_header('Content-type','application/json')
      self.end_headers()

  def do_GET(self):
      print 'get!'
      BaseHTTPRequestHandler.do_GET(self)


class ThreadedHTTPServer(ThreadingMixIn, HTTPServer):
  allow_reuse_address = True

  def shutdown(self):
    self.socket.close()
    HTTPServer.shutdown(self)


class SimpleHttpServer():
  def __init__(self, ip, port):
    self.server = ThreadedHTTPServer((ip,port), HTTPRequestHandler)

  def start(self):
    self.server_thread = threading.Thread(target=self.server.serve_forever)
    self.server_thread.daemon = True
    self.server_thread.start()

  def waitForThread(self):
    self.server_thread.join()

  def addRecord(self, recordID, jsonEncodedRecord):
    LocalData.records[recordID] = jsonEncodedRecord

  def stop(self):
    self.server.shutdown()
    self.waitForThread()

if __name__=='__main__':
  parser = argparse.ArgumentParser(description='HTTP Server')

  server = SimpleHttpServer('localhost', 9090)
  print 'HTTP Server Running...........'
  server.start()
  server.waitForThread()
