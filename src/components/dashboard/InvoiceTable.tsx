
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Invoice, InvoiceStatus } from '@/lib/types';
import { 
  Eye, 
  PenLine, 
  MoreVertical,
  CheckCircle,
  Calendar,
  XCircle,
  Clock,
  FileEdit
} from 'lucide-react';
import { format } from 'date-fns';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface InvoiceTableProps {
  invoices: Invoice[];
}

const getStatusColor = (status: InvoiceStatus): string => {
  switch (status) {
    case 'draft': return 'bg-gray-200 text-gray-800';
    case 'pending': return 'bg-invoice-pending text-white';
    case 'paid': return 'bg-invoice-paid text-white';
    case 'overdue': return 'bg-invoice-overdue text-white';
    case 'cancelled': return 'bg-gray-500 text-white';
    default: return '';
  }
};

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
  }).format(amount);
};

const formatDate = (dateString: string): string => {
  return format(new Date(dateString), 'dd/MM/yyyy');
};

const getStatusIcon = (status: InvoiceStatus) => {
  switch (status) {
    case 'draft': return <FileEdit className="mr-2 h-4 w-4" />;
    case 'pending': return <Clock className="mr-2 h-4 w-4" />;
    case 'paid': return <CheckCircle className="mr-2 h-4 w-4" />;
    case 'overdue': return <Calendar className="mr-2 h-4 w-4" />;
    case 'cancelled': return <XCircle className="mr-2 h-4 w-4" />;
    default: return null;
  }
};

const InvoiceTable: React.FC<InvoiceTableProps> = ({ invoices }) => {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Recent Invoices</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice #</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Issue Date</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>
                  <Link to={`/invoice/${invoice.id}`} className="font-medium hover:underline">
                    {invoice.invoiceNumber}
                  </Link>
                </TableCell>
                <TableCell>{invoice.customer.name}</TableCell>
                <TableCell>{formatDate(invoice.issueDate)}</TableCell>
                <TableCell>{formatDate(invoice.dueDate)}</TableCell>
                <TableCell>{formatCurrency(invoice.total)}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(invoice.status)}>
                    {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-white">
                      <DropdownMenuItem asChild>
                        <Link to={`/invoice/${invoice.id}`} className="flex items-center cursor-pointer">
                          <Eye className="mr-2 h-4 w-4" /> View
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to={`/invoice/edit/${invoice.id}`} className="flex items-center cursor-pointer">
                          <PenLine className="mr-2 h-4 w-4" /> Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center cursor-pointer">
                        {getStatusIcon(invoice.status)} Change Status
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default InvoiceTable;
