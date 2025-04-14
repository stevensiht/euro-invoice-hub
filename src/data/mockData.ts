
import { Invoice, InvoiceStatus } from '../lib/types';

export const mockInvoices: Invoice[] = [
  {
    id: '1',
    invoiceNumber: 'INV-2024-001',
    customer: {
      id: 'c1',
      name: 'Acme Corporation',
      email: 'billing@acme.com',
      address: '123 Business Street, Berlin, Germany',
      vat: 'DE123456789'
    },
    items: [
      {
        id: 'item1',
        description: 'Web Development Services',
        quantity: 40,
        unitPrice: 80,
        taxRate: 19,
        total: 3200
      }
    ],
    subtotal: 3200,
    tax: 608,
    total: 3808,
    issueDate: '2024-04-01',
    dueDate: '2024-05-01',
    status: 'pending' as InvoiceStatus,
    notes: 'Thank you for your business.'
  },
  {
    id: '2',
    invoiceNumber: 'INV-2024-002',
    customer: {
      id: 'c2',
      name: 'TechStart SAS',
      email: 'finance@techstart.fr',
      address: '45 Rue de l\'Innovation, Paris, France',
      vat: 'FR87654321'
    },
    items: [
      {
        id: 'item2',
        description: 'UI/UX Design',
        quantity: 20,
        unitPrice: 100,
        taxRate: 20,
        total: 2000
      }
    ],
    subtotal: 2000,
    tax: 400,
    total: 2400,
    issueDate: '2024-03-15',
    dueDate: '2024-04-15',
    status: 'paid' as InvoiceStatus
  },
  {
    id: '3',
    invoiceNumber: 'INV-2024-003',
    customer: {
      id: 'c3',
      name: 'Nordic Solutions AB',
      email: 'accounts@nordicsolutions.se',
      address: 'Innovationsgatan 7, Stockholm, Sweden',
      vat: 'SE7777888899'
    },
    items: [
      {
        id: 'item3',
        description: 'API Integration Services',
        quantity: 35,
        unitPrice: 90,
        taxRate: 25,
        total: 3150
      }
    ],
    subtotal: 3150,
    tax: 787.5,
    total: 3937.5,
    issueDate: '2024-04-10',
    dueDate: '2024-05-10',
    status: 'draft' as InvoiceStatus
  },
  {
    id: '4',
    invoiceNumber: 'INV-2024-004',
    customer: {
      id: 'c4',
      name: 'Iberian Ventures SL',
      email: 'facturas@iberianventures.es',
      address: 'Calle Empresa 23, Madrid, Spain',
      vat: 'ES111222333'
    },
    items: [
      {
        id: 'item4',
        description: 'Maintenance Contract - Q2 2024',
        quantity: 1,
        unitPrice: 4500,
        taxRate: 21,
        total: 4500
      }
    ],
    subtotal: 4500,
    tax: 945,
    total: 5445,
    issueDate: '2024-04-05',
    dueDate: '2024-04-12',
    status: 'overdue' as InvoiceStatus
  }
];
