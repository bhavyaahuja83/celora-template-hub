
export const detectUserCurrency = (): string => {
  // Try to detect from browser locale first
  const locale = navigator.language || 'en-US';
  
  // Check for Indian locales
  if (locale.includes('IN') || locale.startsWith('hi') || locale.startsWith('en-IN')) {
    return '₹';
  }
  
  // Try to detect from timezone
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (timezone.includes('Asia/Kolkata') || timezone.includes('Asia/Calcutta')) {
      return '₹';
    }
  } catch (error) {
    console.log('Timezone detection failed:', error);
  }
  
  // Default to USD for all other regions
  return '$';
};

export const formatPrice = (price: number, currency?: string): string => {
  const detectedCurrency = currency || detectUserCurrency();
  
  if (detectedCurrency === '₹') {
    return `₹${price.toLocaleString('en-IN')}`;
  } else {
    // Convert INR to USD (mock conversion - in real app, use live rates)
    const usdPrice = Math.round(price * 0.012); // Rough conversion
    return `$${usdPrice}`;
  }
};
