// Cam's Transport Attendance Tracker
class CamsTransportAttendance {
    constructor() {
        this.employees = [
            {
                id: 1,
                name: "Mike Johnson",
                employeeId: "CT001", 
                department: "drivers",
                phone: "(555) 123-4567"
            },
            {
                id: 2,
                name: "Sarah Williams",
                employeeId: "CT002",
                department: "administration", 
                phone: "(555) 234-5678"
            },
            {
                id: 3,
                name: "David Brown",
                employeeId: "CT003",
                department: "maintenance",
                phone: "(555) 345-6789"
            },
            {
                id: 4,
                name: "Lisa Davis", 
                employeeId: "CT004",
                department: "drivers",
                phone: "(555) 456-7890"
            },
            {
                id: 5,
                name: "Robert Wilson",
                employeeId: "CT005",
                department: "logistics",
                phone: "(555) 567-8901"
            },
            {
                id: 6,
                name: "Jennifer Taylor",
                employeeId: "CT006",
                department: "drivers",
                phone: "(555) 678-9012"
            }
        ];
        
        this.attendance = {};
        this.currentDate = new Date().toISOString().split('T')[0];
        this.currentPage = 'attendance';
        this.settings = {
            companyName: "Cam's Transport",
            workStartTime: "08:00",
            lateThreshold: 15
        };
        
        this.init();
    }

    init() {
        this.loadSavedData();
        this.setupDateTime();
        this.setupNavigation();
        this.setupAttendancePage();
        this.setupModals();
        this.setupSettings();
        this.setupReports();
        this.setupEmployeeManagement();
        
        // Set initial date
        document.getElementById('attendance-date').value = this.currentDate;
        
        // Load initial data
        this.renderEmployees();
        this.loadAttendance();
        this.updateStats();
        
        // Update time every second
        setInterval(() => this.updateDateTime(), 1000);
    }

    setupDateTime() {
        this.updateDateTime();
    }

    updateDateTime() {
        const now = new Date();
        const dateOptions = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        const timeOptions = { 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit' 
        };
        
        document.getElementById('current-date').textContent = now.toLocaleDateString('en-US', dateOptions);
        document.getElementById('current-time').textContent = now.toLocaleTimeString('en-US', timeOptions);
    }

    setupNavigation() {
        const navButtons = document.querySelectorAll('.nav-btn');
        
        navButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const page = btn.dataset.page;
                this.switchPage(page);
            });
        });
    }

    switchPage(pageName) {
        // Update navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-page="${pageName}"]`).classList.add('active');
        
        // Update page content
        document.querySelectorAll('.page-content').forEach(page => {
            page.classList.remove('active');
        });
        document.getElementById(`${pageName}-page`).classList.add('active');
        
        this.currentPage = pageName;
        
        // Load page-specific data
        if (pageName === 'employees') {
            this.renderEmployeeManagement();
        }
    }

    setupAttendancePage() {
        const dateInput = document.getElementById('attendance-date');
        const todayBtn = document.getElementById('today-btn');
        const markAllPresentBtn = document.getElementById('mark-all-present');
        const saveBtn = document.getElementById('save-attendance');
        const exportBtn = document.getElementById('export-data');
        
        dateInput.addEventListener('change', (e) => {
            this.currentDate = e.target.value;
            this.loadAttendance();
            this.updateStats();
        });
        
        todayBtn.addEventListener('click', () => {
            this.currentDate = new Date().toISOString().split('T')[0];
            dateInput.value = this.currentDate;
            this.loadAttendance();
            this.updateStats();
        });
        
        markAllPresentBtn.addEventListener('click', () => {
            this.markAllPresent();
        });
        
        saveBtn.addEventListener('click', () => {
            this.saveAttendance();
        });
        
        exportBtn.addEventListener('click', () => {
            this.exportData();
        });
    }

    renderEmployees() {
        const grid = document.getElementById('employee-grid');
        grid.innerHTML = '';
        
        this.employees.forEach(employee => {
            const card = this.createEmployeeCard(employee);
            grid.appendChild(card);
        });
        
        document.getElementById('total-count').textContent = this.employees.length;
    }

    createEmployeeCard(employee) {
        const card = document.createElement('div');
        card.className = 'employee-card';
        card.dataset.employeeId = employee.id;
        
        const departmentDisplay = employee.department.charAt(0).toUpperCase() + employee.department.slice(1);
        
        card.innerHTML = `
            <div class="employee-info">
                <div class="employee-name">${employee.name}</div>
                <div class="employee-details">
                    ID: ${employee.employeeId} | ${departmentDisplay}
                    ${employee.phone ? ` | ${employee.phone}` : ''}
                </div>
            </div>
            <div class="attendance-controls">
                <button class="attendance-btn present" data-status="present">
                    <i class="fas fa-check"></i> Present
                </button>
                <button class="attendance-btn absent" data-status="absent">
                    <i class="fas fa-times"></i> Absent
                </button>
                <button class="attendance-btn late" data-status="late">
                    <i class="fas fa-clock"></i> Late
                </button>
            </div>
            <div class="status-display">Not marked</div>
        `;
        
        // Add event listeners to buttons
        const buttons = card.querySelectorAll('.attendance-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.markAttendance(employee.id, btn.dataset.status);
            });
        });
        
        return card;
    }

    markAttendance(employeeId, status) {
        if (!this.attendance[this.currentDate]) {
            this.attendance[this.currentDate] = {};
        }
        
        this.attendance[this.currentDate][employeeId] = {
            status: status,
            timestamp: new Date().toISOString()
        };
        
        this.updateEmployeeDisplay(employeeId, status);
        this.updateStats();
        this.saveData();
    }

    updateEmployeeDisplay(employeeId, status) {
        const card = document.querySelector(`[data-employee-id="${employeeId}"]`);
        if (!card) return;
        
        // Remove active class from all buttons
        const buttons = card.querySelectorAll('.attendance-btn');
        buttons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to selected button
        const activeBtn = card.querySelector(`[data-status="${status}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }
        
        // Update status display
        const statusDisplay = card.querySelector('.status-display');
        statusDisplay.textContent = status.charAt(0).toUpperCase() + status.slice(1);
        statusDisplay.className = `status-display ${status}`;
    }

    markAllPresent() {
        if (confirm('Mark all employees as present for today?')) {
            this.employees.forEach(employee => {
                this.markAttendance(employee.id, 'present');
            });
        }
    }

    loadAttendance() {
        const todayAttendance = this.attendance[this.currentDate] || {};
        
        // Reset all displays
        document.querySelectorAll('.employee-card').forEach(card => {
            const employeeId = card.dataset.employeeId;
            const buttons = card.querySelectorAll('.attendance-btn');
            const statusDisplay = card.querySelector('.status-display');
            
            // Clear previous states
            buttons.forEach(btn => btn.classList.remove('active'));
            statusDisplay.textContent = 'Not marked';
            statusDisplay.className = 'status-display';
            
            // Apply saved attendance if exists
            if (todayAttendance[employeeId]) {
                const attendanceRecord = todayAttendance[employeeId];
                const status = attendanceRecord.status;
                this.updateEmployeeDisplay(employeeId, status);
            }
        });
    }

    updateStats() {
        const todayAttendance = this.attendance[this.currentDate] || {};
        
        let presentCount = 0;
        let absentCount = 0;
        let lateCount = 0;
        
        Object.values(todayAttendance).forEach(record => {
            switch(record.status) {
                case 'present':
                    presentCount++;
                    break;
                case 'absent':
                    absentCount++;
                    break;
                case 'late':
                    lateCount++;
                    break;
            }
        });
        
        document.getElementById('present-count').textContent = presentCount;
        document.getElementById('absent-count').textContent = absentCount;
        document.getElementById('late-count').textContent = lateCount;
    }

    saveAttendance() {
        this.saveData();
        this.showNotification('Attendance saved successfully!', 'success');
    }

    saveData() {
        const data = {
            employees: this.employees,
            attendance: this.attendance,
            settings: this.settings
        };
        localStorage.setItem('camsTransportData', JSON.stringify(data));
    }

    loadSavedData() {
        const saved = localStorage.getItem('camsTransportData');
        if (saved) {
            const data = JSON.parse(saved);
            this.employees = data.employees || this.employees;
            this.attendance = data.attendance || {};
            this.settings = { ...this.settings, ...(data.settings || {}) };
        }
    }

    exportData() {
        const data = {
            exportDate: new Date().toISOString(),
            companyName: this.settings.companyName,
            employees: this.employees,
            attendance: this.attendance
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `cams-transport-attendance-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        
        this.showNotification('Data exported successfully!', 'success');
    }

    setupModals() {
        const addEmployeeModal = document.getElementById('add-employee-modal');
        const addEmployeeBtn = document.getElementById('add-employee');
        const closeButtons = document.querySelectorAll('.modal-close, .modal-cancel');
        const addEmployeeForm = document.getElementById('add-employee-form');
        
        addEmployeeBtn.addEventListener('click', () => {
            addEmployeeModal.classList.add('active');
        });
        
        closeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                addEmployeeModal.classList.remove('active');
                addEmployeeForm.reset();
            });
        });
        
        addEmployeeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addEmployee();
        });
        
        // Close modal when clicking outside
        addEmployeeModal.addEventListener('click', (e) => {
            if (e.target === addEmployeeModal) {
                addEmployeeModal.classList.remove('active');
                addEmployeeForm.reset();
            }
        });
    }

    addEmployee() {
        const form = document.getElementById('add-employee-form');
        const formData = new FormData(form);
        
        const newEmployee = {
            id: Date.now(), // Simple ID generation
            name: document.getElementById('employee-name').value,
            employeeId: document.getElementById('employee-id').value,
            department: document.getElementById('employee-department').value,
            phone: document.getElementById('employee-phone').value
        };
        
        // Check if employee ID already exists
        if (this.employees.find(emp => emp.employeeId === newEmployee.employeeId)) {
            this.showNotification('Employee ID already exists!', 'error');
            return;
        }
        
        this.employees.push(newEmployee);
        this.saveData();
        this.renderEmployees();
        this.renderEmployeeManagement();
        
        // Close modal and reset form
        document.getElementById('add-employee-modal').classList.remove('active');
        form.reset();
        
        this.showNotification('Employee added successfully!', 'success');
    }

    setupSettings() {
        const companyNameInput = document.getElementById('company-name');
        const workStartTimeInput = document.getElementById('work-start-time');
        const lateThresholdInput = document.getElementById('late-threshold');
        const backupBtn = document.getElementById('backup-data');
        const clearDataBtn = document.getElementById('clear-data');
        
        // Load current settings
        companyNameInput.value = this.settings.companyName;
        workStartTimeInput.value = this.settings.workStartTime;
        lateThresholdInput.value = this.settings.lateThreshold;
        
        // Save settings on change
        [companyNameInput, workStartTimeInput, lateThresholdInput].forEach(input => {
            input.addEventListener('change', () => {
                this.settings.companyName = companyNameInput.value;
                this.settings.workStartTime = workStartTimeInput.value;
                this.settings.lateThreshold = parseInt(lateThresholdInput.value);
                this.saveData();
                this.showNotification('Settings saved!', 'success');
            });
        });
        
        backupBtn.addEventListener('click', () => {
            this.exportData();
        });
        
        clearDataBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to clear all data? This cannot be undone!')) {
                localStorage.removeItem('camsTransportData');
                location.reload();
            }
        });
    }

    setupReports() {
        const generateReportBtn = document.getElementById('generate-report');
        const reportTypeSelect = document.getElementById('report-type');
        const startDateInput = document.getElementById('report-start-date');
        const endDateInput = document.getElementById('report-end-date');
        
        generateReportBtn.addEventListener('click', () => {
            this.generateReport();
        });
        
        reportTypeSelect.addEventListener('change', () => {
            const reportType = reportTypeSelect.value;
            const today = new Date();
            
            if (reportType === 'weekly') {
                const startOfWeek = new Date(today);
                startOfWeek.setDate(today.getDate() - today.getDay());
                startDateInput.value = startOfWeek.toISOString().split('T')[0];
                endDateInput.value = today.toISOString().split('T')[0];
            } else if (reportType === 'monthly') {
                const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
                startDateInput.value = startOfMonth.toISOString().split('T')[0];
                endDateInput.value = today.toISOString().split('T')[0];
            }
        });
    }

    generateReport() {
        const startDate = document.getElementById('report-start-date').value;
        const endDate = document.getElementById('report-end-date').value;
        const reportContent = document.getElementById('report-content');
        
        if (!startDate || !endDate) {
            this.showNotification('Please select start and end dates', 'error');
            return;
        }
        
        const reportData = this.calculateReportData(startDate, endDate);
        reportContent.innerHTML = this.renderReport(reportData, startDate, endDate);
    }

    calculateReportData(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const reportData = {};
        
        // Initialize employee data
        this.employees.forEach(employee => {
            reportData[employee.id] = {
                employee: employee,
                present: 0,
                absent: 0,
                late: 0,
                total: 0
            };
        });
        
        // Calculate attendance for date range
        for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
            const dateStr = date.toISOString().split('T')[0];
            const dayAttendance = this.attendance[dateStr] || {};
            
            Object.keys(dayAttendance).forEach(employeeId => {
                if (reportData[employeeId]) {
                    const status = dayAttendance[employeeId].status;
                    reportData[employeeId][status]++;
                    reportData[employeeId].total++;
                }
            });
        }
        
        return reportData;
    }

    renderReport(reportData, startDate, endDate) {
        let html = `
            <div class="report-header">
                <h3>Attendance Report: ${startDate} to ${endDate}</h3>
                <p>Generated on: ${new Date().toLocaleDateString()}</p>
            </div>
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <thead>
                    <tr style="background: #f3f4f6;">
                        <th style="padding: 12px; text-align: left; border: 1px solid #e5e7eb;">Employee</th>
                        <th style="padding: 12px; text-align: center; border: 1px solid #e5e7eb;">Present</th>
                        <th style="padding: 12px; text-align: center; border: 1px solid #e5e7eb;">Absent</th>
                        <th style="padding: 12px; text-align: center; border: 1px solid #e5e7eb;">Late</th>
                        <th style="padding: 12px; text-align: center; border: 1px solid #e5e7eb;">Attendance Rate</th>
                    </tr>
                </thead>
                <tbody>
        `;
        
        Object.values(reportData).forEach(data => {
            const attendanceRate = data.total > 0 ? ((data.present + data.late) / data.total * 100).toFixed(1) : 0;
            html += `
                <tr>
                    <td style="padding: 12px; border: 1px solid #e5e7eb;">
                        ${data.employee.name}<br>
                        <small style="color: #6b7280;">${data.employee.employeeId} - ${data.employee.department}</small>
                    </td>
                    <td style="padding: 12px; text-align: center; border: 1px solid #e5e7eb; color: #10b981;">${data.present}</td>
                    <td style="padding: 12px; text-align: center; border: 1px solid #e5e7eb; color: #ef4444;">${data.absent}</td>
                    <td style="padding: 12px; text-align: center; border: 1px solid #e5e7eb; color: #f59e0b;">${data.late}</td>
                    <td style="padding: 12px; text-align: center; border: 1px solid #e5e7eb;">${attendanceRate}%</td>
                </tr>
            `;
        });
        
        html += `
                </tbody>
            </table>
        `;
        
        return html;
    }

    setupEmployeeManagement() {
        // Employee management is handled in the renderEmployeeManagement method
    }

    renderEmployeeManagement() {
        const container = document.getElementById('employee-management');
        container.innerHTML = '';
        
        this.employees.forEach(employee => {
            const item = document.createElement('div');
            item.className = 'employee-list-item';
            item.innerHTML = `
                <div class="employee-list-info">
                    <h4>${employee.name}</h4>
                    <p>ID: ${employee.employeeId} | ${employee.department} | ${employee.phone || 'No phone'}</p>
                </div>
                <div class="employee-list-actions">
                    <button class="btn-edit" onclick="app.editEmployee(${employee.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn-delete" onclick="app.deleteEmployee(${employee.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            `;
            container.appendChild(item);
        });
    }

    editEmployee(employeeId) {
        // For now, just show an alert - could implement full edit modal later
        this.showNotification('Edit functionality coming soon!', 'info');
    }

    deleteEmployee(employeeId) {
        const employee = this.employees.find(emp => emp.id === employeeId);
        if (!employee) return;
        
        if (confirm(`Are you sure you want to delete ${employee.name}? This will also remove all their attendance records.`)) {
            // Remove employee
            this.employees = this.employees.filter(emp => emp.id !== employeeId);
            
            // Remove attendance records
            Object.keys(this.attendance).forEach(date => {
                delete this.attendance[date][employeeId];
            });
            
            this.saveData();
            this.renderEmployees();
            this.renderEmployeeManagement();
            this.updateStats();
            
            this.showNotification('Employee deleted successfully!', 'success');
        }
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            z-index: 1001;
            max-width: 300px;
            font-weight: 500;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// Initialize the application
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new CamsTransportAttendance();
});
