
import React from 'react';
import { 
  Document, 
  Page, 
  Text, 
  View, 
  StyleSheet, 
  PDFViewer,
  Font,
  Image
} from '@react-pdf/renderer';
import { InvoiceItem } from '@/components/invoices/InvoiceItems';

// Register fonts for PDF rendering
Font.register({
  family: 'Inter',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7.woff2', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa25L7SUc.woff2', fontWeight: 500 },
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa2pL7SUc.woff2', fontWeight: 600 },
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1pL7.woff2', fontWeight: 700 },
  ]
});

// Create styles for the PDF
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Inter',
    fontSize: 10,
    padding: 40,
    backgroundColor: '#ffffff',
    color: '#1A1F2C',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1A1F2C',
  },
  invoiceDetails: {
    fontSize: 10,
    marginBottom: 4,
  },
  invoiceLabel: {
    width: 80,
    fontWeight: 'medium',
    color: '#555555',
  },
  addressSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  addressColumn: {
    width: '48%',
  },
  addressHeader: {
    fontSize: 10,
    fontWeight: 'medium',
    marginBottom: 5,
    color: '#8E9196',
  },
  companyInfo: {
    fontSize: 10,
    lineHeight: 1.4,
    color: '#333333',
    whiteSpace: 'pre-wrap',
  },
  customerBox: {
    borderWidth: 1,
    borderColor: '#eee',
    borderStyle: 'solid',
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
  table: {
    marginTop: 20,
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 6,
    marginBottom: 10,
    fontSize: 10,
    fontWeight: 'medium',
    color: '#8E9196',
  },
  tableRow: {
    flexDirection: 'row',
    marginBottom: 8,
    fontSize: 10,
  },
  column1: {
    width: '45%',
  },
  column2: {
    width: '15%',
    textAlign: 'center',
  },
  column3: {
    width: '20%',
    textAlign: 'right',
  },
  column4: {
    width: '20%',
    textAlign: 'right',
  },
  totals: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 5,
  },
  totalLabel: {
    width: '20%',
    textAlign: 'right',
    marginRight: 20,
    color: '#555555',
  },
  totalAmount: {
    width: '17%',
    textAlign: 'right',
    fontFamily: 'monospace',
  },
  grandTotal: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#1A1F2C',
  },
  paymentSection: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  paymentDetails: {
    width: '48%',
  },
  paymentHeader: {
    fontSize: 10,
    fontWeight: 'medium',
    marginBottom: 5,
    color: '#8E9196',
  },
  paymentInfo: {
    fontSize: 10,
    lineHeight: 1.4,
    color: '#333333',
  },
  notes: {
    width: '48%',
    fontSize: 10,
    lineHeight: 1.4,
    color: '#555555',
  },
  logo: {
    width: 80,
    height: 80,
    objectFit: 'contain',
  },
});

interface InvoicePDFProps {
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  companyInfo: string;
  customerInfo?: {
    name: string;
    address: string;
  };
  items: InvoiceItem[];
  subtotal: number;
  vat: number;
  total: number;
  notes: string;
  bankAccount: string;
  iban: string;
  bic: string;
  bank: string;
  logoUrl: string | null;
}

// Format currency helper
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
  }).format(amount);
};

// Calculate item total helper
export const calculateItemTotal = (item: InvoiceItem): number => {
  return item.quantity * item.unitPrice;
};

// Create the PDF Document component
export const InvoicePDF = ({
  invoiceNumber,
  issueDate,
  dueDate,
  companyInfo,
  customerInfo,
  items,
  subtotal,
  vat,
  total,
  notes,
  bankAccount,
  iban,
  bic,
  bank,
  logoUrl
}: InvoicePDFProps) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header with Invoice title and number */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Invoice</Text>
            <View style={{ flexDirection: 'row', marginBottom: 3 }}>
              <Text style={styles.invoiceLabel}>Invoice No:</Text>
              <Text>{invoiceNumber}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginBottom: 3 }}>
              <Text style={styles.invoiceLabel}>Issue Date:</Text>
              <Text>{issueDate}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginBottom: 3 }}>
              <Text style={styles.invoiceLabel}>Due Date:</Text>
              <Text>{dueDate}</Text>
            </View>
          </View>
          {logoUrl && (
            <Image src={logoUrl} style={styles.logo} />
          )}
        </View>

        {/* From/To address section */}
        <View style={styles.addressSection}>
          <View style={styles.addressColumn}>
            <Text style={styles.addressHeader}>From</Text>
            <Text style={styles.companyInfo}>{companyInfo}</Text>
          </View>
          <View style={styles.addressColumn}>
            <Text style={styles.addressHeader}>To</Text>
            <View style={styles.customerBox}>
              {customerInfo ? (
                <Text style={styles.companyInfo}>
                  {customerInfo.name}
                  {customerInfo.address && `\n${customerInfo.address}`}
                </Text>
              ) : (
                <Text style={{ color: '#8E9196' }}>No customer selected</Text>
              )}
            </View>
          </View>
        </View>

        {/* Table of items */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.column1}>Description</Text>
            <Text style={styles.column2}>Quantity</Text>
            <Text style={styles.column3}>Price</Text>
            <Text style={styles.column4}>Total</Text>
          </View>

          {items.map((item) => (
            <View key={item.id} style={styles.tableRow}>
              <Text style={styles.column1}>{item.description || 'Item'}</Text>
              <Text style={styles.column2}>{item.quantity}</Text>
              <Text style={styles.column3}>{formatCurrency(item.unitPrice)}</Text>
              <Text style={styles.column4}>{formatCurrency(calculateItemTotal(item))}</Text>
            </View>
          ))}
          
          {/* Totals section */}
          <View style={styles.totals}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Subtotal</Text>
              <Text style={styles.totalAmount}>{formatCurrency(subtotal)}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>VAT (0%)</Text>
              <Text style={styles.totalAmount}>{formatCurrency(vat)}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={{ ...styles.totalLabel, fontWeight: 'bold' }}>Total</Text>
              <Text style={{ ...styles.totalAmount, ...styles.grandTotal }}>{formatCurrency(total)}</Text>
            </View>
          </View>
        </View>

        {/* Payment Details & Notes */}
        <View style={styles.paymentSection}>
          <View style={styles.paymentDetails}>
            <Text style={styles.paymentHeader}>Payment Details</Text>
            <Text style={styles.paymentInfo}>
              {bankAccount}
              {'\n'}{iban}
              {'\n'}{bic}
              {'\n'}{bank}
            </Text>
          </View>
          {notes && (
            <View style={styles.notes}>
              <Text style={styles.paymentHeader}>Notes</Text>
              <Text style={styles.paymentInfo}>{notes}</Text>
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
};

// PDF generator utility
export const generateInvoicePDF = async (props: InvoicePDFProps) => {
  const { pdf } = await import('@react-pdf/renderer');
  const blob = await pdf(<InvoicePDF {...props} />).toBlob();
  return blob;
};

// PDF viewer component for preview
export const InvoicePDFViewer = (props: InvoicePDFProps) => {
  return (
    <PDFViewer style={{ width: '100%', height: '100%', minHeight: '80vh' }}>
      <InvoicePDF {...props} />
    </PDFViewer>
  );
};
