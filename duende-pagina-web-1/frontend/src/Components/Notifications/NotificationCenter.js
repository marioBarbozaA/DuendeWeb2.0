// NotificationCenter.js
import React, { useState, useRef, useEffect } from 'react';
import { HiBell } from 'react-icons/hi'; // This imports the bell icon
import './NotificationCenter.css'; // Ensure you have this CSS file

const NotificationCenter = () => {
    const [isVisible, setIsVisible] = useState(false);
    const dropdownRef = useRef(null);

    const notifications = [
        { title: 'New Course Available', description: 'Check out our latest makeup course!', date: new Date(), type: 'info', state: 'new' },
        { title: 'Sale Ending Soon', description: 'Hurry up! The sale ends in 2 days.', date: new Date(), type: 'warning', state: 'new' },
        // ... more example notifications
    ];

    // Function to toggle visibility of the dropdown
    const toggleDropdown = () => setIsVisible(!isVisible);

    // Close the dropdown if clicked outside
    useEffect(() => {
        const pageClickEvent = (e) => {
            if (dropdownRef.current !== null && !dropdownRef.current.contains(e.target)) {
                setIsVisible(!isVisible);
            }
        };

        // If the item is visible, listen for clicks
        if (isVisible) {
            window.addEventListener('click', pageClickEvent);
        }

        return () => {
            window.removeEventListener('click', pageClickEvent);
        };
    }, [isVisible]);

    return (
      <div className="notification-center">
        <button className="dropdown-button" onClick={() => setIsVisible(!isVisible)}>
          <HiBell size={24} /> {/* Bell icon from Heroicons */}
        </button>
            {isVisible && (
                <div className="dropdown-content">
                    {notifications.map((notification, index) => (
                        <div key={index} className="notification-item">
                            <h4>{notification.title}</h4>
                            <p>{notification.description}</p>
                            <span>{notification.date.toLocaleDateString()}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default NotificationCenter;
