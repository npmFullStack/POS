import React from 'react';

const Info = ({ icon, title, message }) => {
  const styles = {
    bg: 'bg-red-50',
    border: 'border-primary',
    text: 'text-primary',
    iconColor: 'text-primary',
    titleColor: 'text-primary',
    messageColor: 'text-primary'
  };

  return (
    <div className={`${styles.bg} border ${styles.border} rounded-lg p-4 mb-4`}>
      <div className="flex">
        {icon && (
          <div className={`flex-shrink-0 mr-3 ${styles.iconColor}`}>
            {icon}
          </div>
        )}
        <div className="flex-1">
          {title && (
            <h3 className={`text-md font-bold ${styles.titleColor} mb-1`}>
              {title}:
            </h3>
          )}
          {message && (
            <div className={`text-sm ${styles.messageColor}`}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Info;