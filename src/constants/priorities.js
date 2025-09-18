export const PRIORITIES = {
    LOW: {
        value: 'LOW',
        emoji: '🟢', 
        label: 'Low',
        color: 'bg-green-100 text-green-800',
        border: 'border-green-200',
        cardBorder: 'border-l-green-400'
    },
    MEDIUM: {
        value: 'MEDIUM',
        emoji: '🟡', 
        label: 'Medium',
        color: 'bg-yellow-100 text-yellow-800',
        border: 'border-yellow-200',
        cardBorder: 'border-l-yellow-400'
    },
    HIGH: {
        value: 'HIGH',
        emoji: '🔴', 
        label: 'High',
        color: 'bg-red-100 text-red-800',
        border: 'border-red-200',
        cardBorder: 'border-l-red-400'
    },
    URGENT: { 
    value: 'URGENT',
    label: 'Urgent', 
    emoji: '🚨', 
    color: 'bg-red-200 text-red-900', 
    border: 'border-red-300',
    cardBorder: 'border-l-red-600'
    }
};


export const FILTER_OPTIONS = [
  { value: 'ALL', label: 'All', emoji: '📝' },
  { value: 'LOW', label: 'Low', emoji: '🟢' },
  { value: 'MEDIUM', label: 'Medium', emoji: '🟡' },
  { value: 'HIGH', label: 'High', emoji: '🔴' },
  { value: 'URGENT', label: 'Urgent', emoji: '🚨' }
];