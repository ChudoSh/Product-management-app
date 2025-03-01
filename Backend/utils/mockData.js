import Product from '../models/product.js';

import { queryPool } from '../config/db/mysqlSetup.js';
import { DatabaseError } from './errorHandler.js';

const mockProducts = [
  {
    name: 'Wireless Noise-Cancelling Headphones',
    description: 'Premium over-ear headphones with advanced noise cancellation, 40-hour battery life, and comfortable memory foam ear cups',
    price: 249.99
  },
  {
    name: 'Ultra-Slim 4K Smart TV',
    description: '55-inch OLED smart TV with HDR10+, Dolby Vision, and built-in AI-powered smart home integration',
    price: 1299.99
  },
  {
    name: 'Professional Mirrorless Camera',
    description: 'Full-frame 24MP mirrorless camera with 5-axis stabilization, 4K video recording, and weather-sealed body',
    price: 1799.99
  },
  {
    name: 'Ergonomic Standing Desk',
    description: 'Electric height-adjustable desk with memory preset, anti-collision system, and sturdy steel frame',
    price: 599.99
  },
  {
    name: 'Portable Solar Power Generator',
    description: '1000W portable power station with foldable solar panel, multiple output ports, and lithium battery',
    price: 799.99
  },
  {
    name: 'Smart Robot Vacuum Cleaner',
    description: 'AI-powered robot vacuum with laser mapping, self-emptying base, and app control',
    price: 449.99
  },
  {
    name: 'Premium Noise-Cancelling Earbuds',
    description: 'True wireless earbuds with adaptive noise cancellation, touch controls, and 8-hour battery life',
    price: 199.99
  },
  {
    name: 'High-Performance Gaming Laptop',
    description: 'Powerful gaming laptop with RTX 3080, 11th gen Intel i9, 32GB RAM, and 1TB SSD',
    price: 2499.99
  },
  {
    name: 'Professional Coffee Espresso Machine',
    description: 'Fully automatic espresso machine with built-in grinder, milk frother, and touchscreen display',
    price: 899.99
  },
  {
    name: 'Advanced Fitness Smartwatch',
    description: 'Comprehensive fitness tracker with GPS, heart rate monitor, ECG, sleep tracking, and 2-week battery',
    price: 299.99
  },
  {
    name: 'Compact Mini Projector',
    description: 'Portable 1080p LED projector with built-in speakers, WiFi, and 200-inch projection capability',
    price: 349.99
  },
  {
    name: 'Professional Drawing Tablet',
    description: 'Large graphic tablet with pressure-sensitive pen, color-accurate display, and customizable shortcuts',
    price: 599.99
  },
  {
    name: 'Smart Indoor Herb Garden',
    description: 'Hydroponic indoor garden with LED grow lights, automatic watering, and app-controlled environment',
    price: 249.99
  },
  {
    name: 'Portable Electric Bike',
    description: 'Foldable electric bicycle with 250W motor, 25-mile range, and lightweight aluminum frame',
    price: 1099.99
  },
  {
    name: 'Professional Studio Microphone',
    description: 'USB condenser microphone with studio-quality audio, built-in pop filter, and shock mount',
    price: 249.99
  }
];

export async function insertMockProducts() {
    try {
        for (const mockProduct of mockProducts) {
            const product = await Product.create(
                mockProduct.name, 
                mockProduct.description, 
                mockProduct.price
              );
        }
        console.log('Mock data insertion completed successfully');
    } catch (error) {
        return new DatabaseError('Failed to insert mock data');
    }
  
}

