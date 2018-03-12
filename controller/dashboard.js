import express from 'express';

export default function initDashboardApp(server) {
  server.use(express.static('dist'))
}
