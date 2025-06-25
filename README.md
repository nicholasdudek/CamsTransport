# Cam's Transport - Employee Attendance Tracker

A comprehensive web-based attendance tracking system designed specifically for Cam's Transport company.

## Features

### 🎯 Core Functionality
- **Daily Attendance Tracking** - Mark employees as Present, Absent, or Late
- **Real-time Statistics** - View attendance counts and percentages
- **Employee Management** - Add, edit, and remove employees
- **Department Organization** - Organize employees by department (Drivers, Maintenance, Administration, Logistics)
- **Date Navigation** - Track attendance for any date
- **Bulk Actions** - Mark all employees present with one click

### 📊 Reports & Analytics
- **Weekly Reports** - Generate attendance reports for any week
- **Monthly Reports** - Comprehensive monthly attendance analysis
- **Custom Date Range** - Generate reports for any date range
- **Export Data** - Download attendance data as JSON files
- **Attendance Rate Calculations** - Automatic calculation of attendance percentages

### ⚙️ Settings & Configuration
- **Company Settings** - Customize company name and work hours
- **Late Threshold** - Configure when an employee is considered late
- **Data Backup** - Export and backup all attendance data
- **Data Management** - Clear all data when needed

### 🎨 User Interface
- **Modern Design** - Clean, professional interface with Cam's Transport branding
- **Responsive Layout** - Works on desktop, tablet, and mobile devices
- **Real-time Clock** - Always shows current date and time
- **Intuitive Navigation** - Easy-to-use tabbed interface
- **Visual Feedback** - Color-coded status indicators and notifications

## Getting Started

### Installation
1. Double-click `index.html` to open in your web browser
2. No installation or server setup required - runs entirely in the browser

### First Time Setup
1. Open the application in your web browser
2. Navigate to the "Settings" tab to configure:
   - Company name (default: "Cam's Transport")
   - Work start time (default: 8:00 AM)
   - Late threshold in minutes (default: 15 minutes)
3. Go to "Manage Employees" to add your staff members
4. Start tracking attendance on the "Daily Attendance" tab

## Usage Guide

### Daily Attendance
1. **Select Date**: Use the date picker to choose the day you want to track
2. **Mark Attendance**: Click Present, Absent, or Late for each employee
3. **Quick Actions**: Use "Mark All Present" for days when everyone shows up
4. **Save Data**: Click "Save Attendance" to store the data locally
5. **View Stats**: Check the summary cards for real-time statistics

### Employee Management
1. **Add Employees**: Click "Add Employee" and fill in their details
2. **Employee Information**: Include name, ID, department, and phone number
3. **Edit/Delete**: Use the action buttons next to each employee
4. **Departments**: Choose from Drivers, Maintenance, Administration, or Logistics

### Generating Reports
1. **Choose Report Type**: Select Weekly, Monthly, or Custom range
2. **Set Dates**: Pick start and end dates for your report
3. **Generate**: Click "Generate Report" to view the data
4. **Export**: Use the export feature to download attendance data

### Data Management
- **Auto-Save**: All data is automatically saved to your browser's local storage
- **Export Data**: Download your data as JSON files for backup
- **Import**: Data persists between browser sessions
- **Clear Data**: Option to reset all data in Settings (use with caution)

## File Structure

```
Cams-Transport-Attendance/
├── index.html          # Main application file
├── css/
│   └── styles.css      # All styling and responsive design
├── js/
│   └── app.js          # Application logic and functionality  
├── data/
│   └── config.json     # Configuration and default settings
└── README.md           # This documentation file
```

## Browser Compatibility

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ⚠️ Internet Explorer (limited support)

## Data Storage

- **Local Storage**: Data is stored in your browser's local storage
- **Privacy**: No data is sent to external servers
- **Backup**: Regular exports recommended for data safety
- **Persistence**: Data survives browser restarts but not browser data clearing

## Customization

### Colors and Branding
Edit `css/styles.css` to change:
- Company colors (currently red/burgundy theme)
- Logo and branding elements
- Layout and spacing

### Default Employees
Edit `data/config.json` to change:
- Default employee list
- Department names
- Company settings

### Functionality
Edit `js/app.js` to add:
- New features
- Custom business logic
- Additional report types

## Troubleshooting

### Common Issues

**Problem**: Data disappears after browser restart
- **Solution**: Make sure you're not browsing in incognito/private mode

**Problem**: Can't add new employees
- **Solution**: Check that employee ID doesn't already exist

**Problem**: Reports not generating
- **Solution**: Ensure you have attendance data for the selected date range

**Problem**: Page not loading properly
- **Solution**: Check that all files are in the correct folders and try refreshing

### Support
This is a standalone application. For technical support:
1. Check the browser console for error messages (F12 → Console)
2. Ensure all files are present and in correct locations
3. Try refreshing the page or clearing browser cache

## Version History

- **v1.0** - Initial release with core attendance tracking features
- Comprehensive employee management
- Report generation and data export
- Responsive design optimized for Cam's Transport

## License

This attendance tracker is designed specifically for Cam's Transport. 
Modify and customize as needed for your business requirements.

---

**Cam's Transport Attendance Tracker**  
Built with ❤️ for efficient workforce management
