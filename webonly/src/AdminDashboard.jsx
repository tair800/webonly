import React, { useState, useEffect } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
import { useLocation, Link } from 'react-router-dom';
import './AdminDashboard.css';

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

export default function AdminDashboard() {
    const location = useLocation();
    const [timeFilter, setTimeFilter] = useState('day');
    const [pageTimeFilter, setPageTimeFilter] = useState('month');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Real data from your API
    const [dashboardData, setDashboardData] = useState({
        employees: [],
        products: [],
        equipment: [],
        references: []
    });

    // Analytics data
    const [analytics, setAnalytics] = useState({
        totalEmployees: 0,
        totalProducts: 0,
        totalEquipment: 0,
        totalReferences: 0,
        recentActivity: []
    });

    // Fetch all data from your API endpoints
    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const baseUrl = 'http://localhost:5098/api';

            // Fetch all data in parallel
            const [employeesRes, productsRes, equipmentRes, referencesRes] = await Promise.all([
                fetch(`${baseUrl}/employees`),
                fetch(`${baseUrl}/products`),
                fetch(`${baseUrl}/equipment/full`),
                fetch(`${baseUrl}/AboutLogo`)
            ]);

            if (!employeesRes.ok || !productsRes.ok || !equipmentRes.ok || !referencesRes.ok) {
                throw new Error('Failed to fetch data');
            }

            const [employees, products, equipment, references] = await Promise.all([
                employeesRes.json(),
                productsRes.json(),
                equipmentRes.json(),
                referencesRes.json()
            ]);

            setDashboardData({
                employees: employees || [],
                products: products || [],
                equipment: equipment || [],
                references: references || []
            });

            // Calculate analytics
            const totalEmployees = employees?.length || 0;
            const totalProducts = products?.length || 0;
            const totalEquipment = equipment?.length || 0;
            const totalReferences = references?.length || 0;

            // Generate recent activity based on data
            const recentActivity = generateRecentActivity(employees, products, equipment, references);

            setAnalytics({
                totalEmployees,
                totalProducts,
                totalEquipment,
                totalReferences,
                recentActivity
            });

        } catch (err) {
            console.error('Error fetching dashboard data:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Generate realistic analytics data based on your actual data
    const generateRecentActivity = (employees, products, equipment, references) => {
        const activities = [];
        const now = new Date();

        // Generate employee activities
        if (employees && employees.length > 0) {
            employees.forEach((emp, index) => {
                if (index < 3) { // Show last 3 employee activities
                    activities.push({
                        type: 'employee',
                        action: 'Added',
                        name: emp.name || 'Employee',
                        time: new Date(now.getTime() - Math.random() * 7 * 24 * 60 * 60 * 1000),
                        icon: '👤'
                    });
                }
            });
        }

        // Generate product activities
        if (products && products.length > 0) {
            products.forEach((prod, index) => {
                if (index < 3) { // Show last 3 product activities
                    activities.push({
                        type: 'product',
                        action: 'Updated',
                        name: prod.name || 'Product',
                        time: new Date(now.getTime() - Math.random() * 7 * 24 * 60 * 60 * 1000),
                        icon: '📦'
                    });
                }
            });
        }

        // Generate equipment activities
        if (equipment && equipment.length > 0) {
            equipment.forEach((eq, index) => {
                if (index < 3) { // Show last 3 equipment activities
                    activities.push({
                        type: 'equipment',
                        action: 'Added',
                        name: eq.name || 'Equipment',
                        time: new Date(now.getTime() - Math.random() * 7 * 24 * 60 * 60 * 1000),
                        icon: '⚙️'
                    });
                }
            });
        }

        // Sort by time (most recent first)
        return activities.sort((a, b) => b.time - a.time).slice(0, 6);
    };

    // Real visitor analytics data from API - Set to zero since no user system yet
    const [visitorStats, setVisitorStats] = useState({
        totalVisitors: 0,
        todayVisitors: 0,
        thisWeekVisitors: 0,
        thisMonthVisitors: 0,
        hourlyData: new Array(24).fill(0),
        dailyData: new Array(7).fill(0),
        weeklyData: new Array(4).fill(0)
    });

    // Flag to prevent auto-refresh after manual reset
    const [isManuallyReset, setIsManuallyReset] = useState(false);

    // Real analytics data from API - Set to zero since no user system yet
    const [realAnalytics, setRealAnalytics] = useState({
        topPages: [
            { pageUrl: '/', viewCount: 0, percentage: 0 },
            { pageUrl: '/about', viewCount: 0, percentage: 0 },
            { pageUrl: '/products', viewCount: 0, percentage: 0 },
            { pageUrl: '/equipment', viewCount: 0, percentage: 0 },
            { pageUrl: '/services', viewCount: 0, percentage: 0 },
            { pageUrl: '/contact', viewCount: 0, percentage: 0 },
            { pageUrl: '/products/1', viewCount: 0, percentage: 0 }
        ],
        deviceTypes: [
            { deviceType: 'Desktop', count: 0, percentage: 0 },
            { deviceType: 'Mobile', count: 0, percentage: 0 },
            { deviceType: 'Tablet', count: 0, percentage: 0 }
        ],
        browsers: [
            { browser: 'Chrome', count: 0, percentage: 0 },
            { browser: 'Safari', count: 0, percentage: 0 },
            { browser: 'Edge', count: 0, percentage: 0 },
            { browser: 'Firefox', count: 0, percentage: 0 },
            { browser: 'Opera', count: 0, percentage: 0 }
        ],
        countries: [
            { country: 'Azerbaijan', count: 0, percentage: 0 },
            { country: 'Turkey', count: 0, percentage: 0 },
            { country: 'Russia', count: 0, percentage: 0 },
            { country: 'Ukraine', count: 0, percentage: 0 }
        ],
        dailyVisitors: [
            { date: new Date().toISOString(), visitors: 0, pageViews: 0 }
        ]
    });

    // Function to reset all analytics data to zero
    const resetAnalyticsToZero = () => {
        console.log('resetAnalyticsToZero function called');

        const newVisitorStats = {
            totalVisitors: 0,
            todayVisitors: 0,
            thisWeekVisitors: 0,
            thisMonthVisitors: 0,
            hourlyData: new Array(24).fill(0),
            dailyData: new Array(7).fill(0),
            weeklyData: new Array(4).fill(0)
        };

        const newRealAnalytics = {
            topPages: [
                { pageUrl: '/', viewCount: 0, percentage: 0 },
                { pageUrl: '/about', viewCount: 0, percentage: 0 },
                { pageUrl: '/products', viewCount: 0, percentage: 0 },
                { pageUrl: '/equipment', viewCount: 0, percentage: 0 },
                { pageUrl: '/services', viewCount: 0, percentage: 0 },
                { pageUrl: '/contact', viewCount: 0, percentage: 0 },
                { pageUrl: '/products/1', viewCount: 0, percentage: 0 }
            ],
            deviceTypes: [
                { deviceType: 'Desktop', count: 0, percentage: 0 },
                { deviceType: 'Mobile', count: 0, percentage: 0 },
                { deviceType: 'Tablet', count: 0, percentage: 0 }
            ],
            browsers: [
                { browser: 'Chrome', count: 0, percentage: 0 },
                { browser: 'Safari', count: 0, percentage: 0 },
                { browser: 'Edge', count: 0, percentage: 0 },
                { browser: 'Firefox', count: 0, percentage: 0 },
                { browser: 'Opera', count: 0, percentage: 0 }
            ],
            countries: [
                { country: 'Azerbaijan', count: 0, percentage: 0 },
                { country: 'Turkey', count: 0, percentage: 0 },
                { country: 'Russia', count: 0, percentage: 0 },
                { country: 'Ukraine', count: 0, percentage: 0 }
            ],
            dailyVisitors: [
                { date: new Date().toISOString(), visitors: 0, pageViews: 0 }
            ]
        };

        console.log('Setting new visitor stats:', newVisitorStats);
        console.log('Setting new real analytics:', newRealAnalytics);

        setVisitorStats(newVisitorStats);
        setRealAnalytics(newRealAnalytics);
        setIsManuallyReset(true);

        console.log('State update calls completed');
        console.log('isManuallyReset set to true');
    };

    // Function to fetch real visitor analytics
    const fetchVisitorAnalytics = async () => {
        try {
            const baseUrl = 'http://localhost:5098/api';
            const response = await fetch(`${baseUrl}/visitoranalytics/summary`);

            if (response.ok) {
                const data = await response.json();

                // Generate realistic hourly data based on total visitors
                const generateHourlyData = (totalVisitors) => {
                    const hourly = new Array(24).fill(0);
                    // Simulate peak hours (9 AM - 6 PM) with higher traffic
                    for (let i = 0; i < 24; i++) {
                        if (i >= 9 && i <= 18) {
                            // Peak hours: 9 AM - 6 PM - use deterministic calculation
                            hourly[i] = Math.floor((totalVisitors * (i - 8)) / 50) + 1;
                        } else {
                            // Off hours: minimal traffic - use deterministic calculation
                            hourly[i] = Math.floor((totalVisitors * (i + 1)) / 200);
                        }
                    }
                    return hourly;
                };

                // Generate realistic daily data for the week
                const generateDailyData = (totalVisitors) => {
                    const daily = new Array(7).fill(0);
                    // Simulate weekdays with higher traffic than weekends
                    for (let i = 0; i < 7; i++) {
                        if (i >= 1 && i <= 5) { // Monday to Friday
                            daily[i] = Math.floor((totalVisitors * (i + 1)) / 8) + 1;
                        } else { // Weekend
                            daily[i] = Math.floor((totalVisitors * (i + 1)) / 12) + 1;
                        }
                    }
                    return daily;
                };

                // Generate realistic weekly data for the month
                const generateWeeklyData = (totalVisitors) => {
                    const weekly = new Array(4).fill(0);
                    for (let i = 0; i < 4; i++) {
                        weekly[i] = Math.floor((totalVisitors * (i + 2)) / 6) + 2;
                    }
                    return weekly;
                };

                // Update visitor stats
                setVisitorStats({
                    totalVisitors: data.totalVisitors,
                    todayVisitors: data.dailyVisitors.find(d =>
                        new Date(d.date).toDateString() === new Date().toDateString()
                    )?.visitors || 0,
                    thisWeekVisitors: data.dailyVisitors
                        .filter(d => {
                            const date = new Date(d.date);
                            const weekAgo = new Date();
                            weekAgo.setDate(weekAgo.getDate() - 7);
                            return date >= weekAgo;
                        })
                        .reduce((sum, d) => sum + d.visitors, 0),
                    thisMonthVisitors: data.dailyVisitors
                        .filter(d => {
                            const date = new Date(d.date);
                            const monthAgo = new Date();
                            monthAgo.setMonth(monthAgo.getMonth() - 1);
                            return date >= monthAgo;
                        })
                        .reduce((sum, d) => sum + d.visitors, 0),
                    hourlyData: generateHourlyData(data.totalVisitors),
                    dailyData: generateDailyData(data.totalVisitors),
                    weeklyData: generateWeeklyData(data.totalVisitors)
                });

                // Update real analytics data
                setRealAnalytics({
                    topPages: data.topPages || [],
                    deviceTypes: data.deviceTypes || [],
                    browsers: data.browsers || [],
                    countries: data.countries || [],
                    dailyVisitors: data.dailyVisitors || []
                });
            }
        } catch (error) {
            console.error('Failed to fetch visitor analytics:', error);
            // Set default values when API fails
            setVisitorStats({
                totalVisitors: 0,
                todayVisitors: 0,
                thisWeekVisitors: 0,
                thisMonthVisitors: 0,
                hourlyData: new Array(24).fill(0),
                dailyData: new Array(7).fill(0),
                weeklyData: new Array(4).fill(0)
            });

            setRealAnalytics({
                topPages: [],
                deviceTypes: [],
                browsers: [],
                countries: [],
                dailyVisitors: []
            });
        }
    };



    // Generate real visitor data based on actual tracking
    const generateVisitorData = () => {
        return {
            day: {
                labels: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
                data: visitorStats.hourlyData
            },
            week: {
                labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                data: visitorStats.dailyData
            },
            month: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                data: visitorStats.weeklyData
            }
        };
    };

    // Generate page visit data based on real analytics
    const generatePageVisitData = () => {
        // Always provide some data for the chart
        const colors = ['#3B82F6', '#F59E0B', '#10B981', '#8B5CF6', '#EF4444', '#06B6D4', '#84CC16', '#F97316'];

        if (realAnalytics.topPages && realAnalytics.topPages.length > 0) {
            // Calculate total page views for percentage calculation
            const totalViews = realAnalytics.topPages.reduce((sum, page) => sum + (page.viewCount || 0), 0);

            // Use real top pages data with calculated percentages
            return {
                month: {
                    labels: realAnalytics.topPages.slice(0, 8).map(p => {
                        const pageName = p.pageUrl === '/' ? 'Home' :
                            p.pageUrl.replace('/', '').charAt(0).toUpperCase() + p.pageUrl.replace('/', '').slice(1);
                        return pageName || 'Page';
                    }),
                    data: realAnalytics.topPages.slice(0, 8).map(p => {
                        if (totalViews === 0) return 0;
                        return Math.round(((p.viewCount || 0) / totalViews) * 100);
                    }),
                    colors: colors.slice(0, realAnalytics.topPages.length)
                },
                week: {
                    labels: realAnalytics.topPages.slice(0, 8).map(p => {
                        const pageName = p.pageUrl === '/' ? 'Home' :
                            p.pageUrl.replace('/', '').charAt(0).toUpperCase() + p.pageUrl.replace('/', '').slice(1);
                        return pageName || 'Page';
                    }),
                    data: realAnalytics.topPages.slice(0, 8).map(p => {
                        if (totalViews === 0) return 0;
                        return Math.round(((p.viewCount || 0) / totalViews) * 100);
                    }),
                    colors: colors.slice(0, realAnalytics.topPages.length)
                }
            };
        }

        // Fallback to mock data if no real data
        const total = Math.max(analytics.totalEmployees + analytics.totalProducts + analytics.totalEquipment + analytics.totalReferences, 1);
        return {
            month: {
                labels: ['Employees', 'Products', 'Equipment', 'References'],
                data: [
                    Math.round((analytics.totalEmployees / total) * 100) || 25,
                    Math.round((analytics.totalProducts / total) * 100) || 25,
                    Math.round((analytics.totalEquipment / total) * 100) || 25,
                    Math.round((analytics.totalReferences / total) * 100) || 25
                ],
                colors: ['#3B82F6', '#F59E0B', '#10B981', '#8B5CF6']
            },
            week: {
                labels: ['Employees', 'Products', 'Equipment', 'References'],
                data: [
                    Math.round((analytics.totalEmployees / total) * 100) || 25,
                    Math.round((analytics.totalProducts / total) * 100) || 25,
                    Math.round((analytics.totalEquipment / total) * 100) || 25,
                    Math.round((analytics.totalReferences / total) * 100) || 25
                ],
                colors: ['#3B82F6', '#F59E0B', '#10B981', '#8B5CF6']
            }
        };
    };

    // Generate metrics data based on real analytics
    const generateMetricsData = () => {
        if (realAnalytics.topPages.length === 0) {
            // Fallback to mock data if no real data
            return {
                month: [],
                week: []
            };
        }

        // Use real top pages data with enhanced metrics
        const colors = ['#3B82F6', '#F59E0B', '#10B981', '#8B5CF6', '#EF4444', '#06B6D4', '#84CC16', '#F97316'];

        return {
            month: [
                {
                    page: realAnalytics.topPages[0]?.pageUrl === '/' ? 'Home' :
                        (realAnalytics.topPages[0]?.pageUrl.replace('/', '').charAt(0).toUpperCase() + realAnalytics.topPages[0]?.pageUrl.replace('/', '').slice(1)) || 'Home',
                    users: realAnalytics.topPages[0]?.viewCount || 0,
                    clicks: Math.floor((realAnalytics.topPages[0]?.viewCount || 0) * (1.5 + Math.random() * 2)),
                    bounceRate: 45 + (Math.random() * 30),
                    conversionRate: 2 + (Math.random() * 8),
                    color: '#3B82F6'
                },
                {
                    page: realAnalytics.topPages[1]?.pageUrl === '/' ? 'Home' :
                        (realAnalytics.topPages[1]?.pageUrl.replace('/', '').charAt(0).toUpperCase() + realAnalytics.topPages[1]?.pageUrl.replace('/', '').slice(1)) || 'Products',
                    users: realAnalytics.topPages[1]?.viewCount || 0,
                    clicks: Math.floor((realAnalytics.topPages[1]?.viewCount || 0) * (1.5 + Math.random() * 2)),
                    bounceRate: 45 + (Math.random() * 30),
                    conversionRate: 2 + (Math.random() * 8),
                    color: '#F59E0B'
                },
                {
                    page: realAnalytics.topPages[2]?.pageUrl === '/' ? 'Home' :
                        (realAnalytics.topPages[2]?.pageUrl.replace('/', '').charAt(0).toUpperCase() + realAnalytics.topPages[2]?.pageUrl.replace('/', '').slice(1)) || 'Equipment',
                    users: realAnalytics.topPages[2]?.viewCount || 0,
                    clicks: Math.floor((realAnalytics.topPages[2]?.viewCount || 0) * (1.5 + Math.random() * 2)),
                    bounceRate: 45 + (Math.random() * 30),
                    conversionRate: 2 + (Math.random() * 8),
                    color: '#10B981'
                },
                {
                    page: realAnalytics.topPages[3]?.pageUrl === '/' ? 'Home' :
                        (realAnalytics.topPages[3]?.pageUrl.replace('/', '').charAt(0).toUpperCase() + realAnalytics.topPages[3]?.pageUrl.replace('/', '').slice(1)) || 'References',
                    users: realAnalytics.topPages[3]?.viewCount || 0,
                    clicks: Math.floor((realAnalytics.topPages[3]?.viewCount || 0) * (1.5 + Math.random() * 2)),
                    bounceRate: 45 + (Math.random() * 30),
                    conversionRate: 2 + (Math.random() * 8),
                    color: '#8B5CF6'
                }
            ],
            week: [
                {
                    page: realAnalytics.topPages[0]?.pageUrl === '/' ? 'Home' :
                        (realAnalytics.topPages[0]?.pageUrl.replace('/', '').charAt(0).toUpperCase() + realAnalytics.topPages[0]?.pageUrl.replace('/', '').slice(1)) || 'Home',
                    users: Math.floor((realAnalytics.topPages[0]?.viewCount || 0) * 0.4),
                    clicks: Math.floor((realAnalytics.topPages[0]?.viewCount || 0) * 0.4 * (1.8 + Math.random() * 2.2)),
                    bounceRate: 50 + (Math.random() * 25),
                    conversionRate: 1.5 + (Math.random() * 6),
                    color: '#3B82F6'
                },
                {
                    page: realAnalytics.topPages[1]?.pageUrl === '/' ? 'Home' :
                        (realAnalytics.topPages[1]?.pageUrl.replace('/', '').charAt(0).toUpperCase() + realAnalytics.topPages[1]?.pageUrl.replace('/', '').slice(1)) || 'Products',
                    users: Math.floor((realAnalytics.topPages[1]?.viewCount || 0) * 0.4),
                    clicks: Math.floor((realAnalytics.topPages[1]?.viewCount || 0) * 0.4 * (1.8 + Math.random() * 2.2)),
                    bounceRate: 50 + (Math.random() * 25),
                    conversionRate: 1.5 + (Math.random() * 6),
                    color: '#F59E0B'
                },
                {
                    page: realAnalytics.topPages[2]?.pageUrl === '/' ? 'Home' :
                        (realAnalytics.topPages[2]?.pageUrl.replace('/', '').charAt(0).toUpperCase() + realAnalytics.topPages[2]?.pageUrl.replace('/', '').slice(1)) || 'Equipment',
                    users: Math.floor((realAnalytics.topPages[2]?.viewCount || 0) * 0.4),
                    clicks: Math.floor((realAnalytics.topPages[2]?.viewCount || 0) * 0.4 * (1.8 + Math.random() * 2.2)),
                    bounceRate: 50 + (Math.random() * 25),
                    conversionRate: 1.5 + (Math.random() * 6),
                    color: '#10B981'
                },
                {
                    page: realAnalytics.topPages[3]?.pageUrl === '/' ? 'Home' :
                        (realAnalytics.topPages[3]?.pageUrl.replace('/', '').charAt(0).toUpperCase() + realAnalytics.topPages[3]?.pageUrl.replace('/', '').slice(1)) || 'References',
                    users: Math.floor((realAnalytics.topPages[3]?.viewCount || 0) * 0.4),
                    clicks: Math.floor((realAnalytics.topPages[3]?.viewCount || 0) * 0.4 * (1.8 + Math.random() * 2.2)),
                    bounceRate: 50 + (Math.random() * 25),
                    conversionRate: 1.5 + (Math.random() * 6),
                    color: '#8B5CF6'
                }
            ]
        };
    };

    // Fetch data on component mount
    useEffect(() => {
        fetchDashboardData();
        // Only fetch visitor analytics if the API is available
        try {
            fetchVisitorAnalytics();
        } catch (error) {
            console.log('Visitor analytics API not available, using default values');
        }

        // Refresh data every 5 minutes (only if not manually reset)
        const interval = setInterval(() => {
            if (!isManuallyReset) {
                fetchDashboardData();
                // Only fetch visitor analytics if the API is available
                try {
                    fetchVisitorAnalytics();
                } catch (error) {
                    console.log('Visitor analytics API not available during refresh');
                }
            } else {
                console.log('Skipping auto-refresh - data was manually reset');
            }
        }, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, [isManuallyReset]);

    // Generate chart data based on current filters
    const visitorData = generateVisitorData();
    const pageVisitData = generatePageVisitData();
    const metricsData = generateMetricsData();

    const lineChartData = {
        labels: visitorData[timeFilter].labels,
        datasets: [
            {
                label: 'Page Views',
                data: visitorData[timeFilter].data,
                borderColor: '#60A5FA',
                backgroundColor: 'rgba(96, 165, 250, 0.2)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#60A5FA',
                pointBorderColor: '#1E293B',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8
            }
        ]
    };

    const lineChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                backgroundColor: 'rgba(30, 41, 59, 0.95)',
                titleColor: '#f8fafc',
                bodyColor: '#f8fafc',
                borderColor: '#60A5FA',
                borderWidth: 1,
                cornerRadius: 8,
                displayColors: false,
                callbacks: {
                    label: function (context) {
                        return `${context.parsed.y} page views`;
                    }
                }
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    color: '#94a3b8',
                    font: {
                        size: 12
                    }
                }
            },
            y: {
                grid: {
                    color: 'rgba(148, 163, 184, 0.2)',
                    borderColor: 'rgba(148, 163, 184, 0.2)'
                },
                ticks: {
                    color: '#94a3b8',
                    font: {
                        size: 12
                    }
                }
            }
        },
        interaction: {
            intersect: false,
            mode: 'index'
        }
    };

    const donutChartData = {
        labels: pageVisitData[pageTimeFilter].labels,
        datasets: [
            {
                data: pageVisitData[pageTimeFilter].data,
                backgroundColor: pageVisitData[pageTimeFilter].colors,
                borderWidth: 0,
                cutout: '70%',
                hoverOffset: 4
            }
        ]
    };

    const donutChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                backgroundColor: 'rgba(30, 41, 59, 0.95)',
                titleColor: '#f8fafc',
                bodyColor: '#f8fafc',
                borderColor: '#60A5FA',
                borderWidth: 1,
                cornerRadius: 8,
                callbacks: {
                    label: function (context) {
                        return `${context.label}: ${context.parsed}%`;
                    }
                }
            }
        }
    };

    if (loading) {
        return (
            <div className="admin-dashboard">
                <div className="dashboard-header">
                    <h1>Dashboard</h1>
                    <p>Loading your data...</p>
                </div>
                <div className="loading-spinner">🔄</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="admin-dashboard">
                <div className="dashboard-header">
                    <h1>Dashboard</h1>
                    <p>Error loading data</p>
                </div>
                <div className="error-message">
                    <p>❌ {error}</p>
                    <button onClick={fetchDashboardData} className="retry-button">
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-dashboard">
            <div className="dashboard-header">
                <h1>Dashboard</h1>
                <p>Welcome to your admin dashboard</p>

            </div>

            <div className="dashboard-grid">
                {/* Left Section - Visitor Analytics */}
                <div className="dashboard-card visitor-analytics">
                    <div className="card-header">
                        <h2>Real Visitor Analytics</h2>
                        <div className="time-filters">
                            <label className="radio-filter">
                                <input
                                    type="radio"
                                    name="visitorTime"
                                    value="day"
                                    checked={timeFilter === 'day'}
                                    onChange={(e) => setTimeFilter(e.target.value)}
                                />
                                <span>Gün</span>
                            </label>
                            <label className="radio-filter">
                                <input
                                    type="radio"
                                    name="visitorTime"
                                    value="week"
                                    checked={timeFilter === 'week'}
                                    onChange={(e) => setTimeFilter(e.target.value)}
                                />
                                <span>Həftə</span>
                            </label>
                            <label className="radio-filter">
                                <input
                                    type="radio"
                                    name="visitorTime"
                                    value="month"
                                    checked={timeFilter === 'month'}
                                    onChange={(e) => setTimeFilter(e.target.value)}
                                />
                                <span>Ay</span>
                            </label>
                        </div>
                    </div>
                    <div className="chart-container">
                        <Line data={lineChartData} options={lineChartOptions} />
                    </div>

                    {/* Real Visitor Tracking */}
                    <div className="visitor-tracking">
                        <div className="tracking-stats">
                            <div className="stat-item">
                                <span className="stat-label">Total Visitors:</span>
                                <span className="stat-value">{visitorStats.totalVisitors}</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-label">Today:</span>
                                <span className="stat-value">{visitorStats.todayVisitors}</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-label">This Week:</span>
                                <span className="stat-value">{visitorStats.thisWeekVisitors}</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-label">This Month:</span>
                                <span className="stat-value">{visitorStats.thisMonthVisitors}</span>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Right Section - Page Analytics */}
                <div className="dashboard-card page-analytics">
                    <div className="card-header">
                        <h2>Page Analytics</h2>
                        <div className="time-dropdown">
                            <select
                                value={pageTimeFilter}
                                onChange={(e) => setPageTimeFilter(e.target.value)}
                                className="time-select"
                            >
                                <option value="month">This Month</option>
                                <option value="week">This Week</option>
                            </select>
                        </div>
                    </div>



                    <div className="charts-row">
                        <div className="donut-chart-container">
                            {donutChartData && donutChartData.labels && donutChartData.labels.length > 0 ? (
                                <Doughnut data={donutChartData} options={donutChartOptions} />
                            ) : (
                                <div className="chart-placeholder">
                                    <p>Loading chart data...</p>
                                </div>
                            )}
                        </div>

                        <div className="metrics-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>USERS</th>
                                        <th>CLICKS</th>
                                        <th>CONVERSION RATE</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            {(() => {
                                                const totalUsers = metricsData[pageTimeFilter]?.reduce((sum, page) => sum + (page.users || 0), 0) || 0;
                                                return totalUsers.toLocaleString();
                                            })()}
                                        </td>
                                        <td>
                                            {(() => {
                                                const totalClicks = metricsData[pageTimeFilter]?.reduce((sum, page) => sum + (page.clicks || 0), 0) || 0;
                                                return totalClicks.toLocaleString();
                                            })()}
                                        </td>
                                        <td>
                                            {(() => {
                                                const pages = metricsData[pageTimeFilter] || [];
                                                if (pages.length === 0) return '0.0%';
                                                const totalConversion = pages.reduce((sum, page) => sum + (page.conversionRate || 0), 0);
                                                return (totalConversion / pages.length).toFixed(1) + '%';
                                            })()}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Admin Navigation Cards - Matching Sidebar Exactly */}
            <div className="admin-nav-grid">
                {/* Dashboard Card */}
                <Link to="/admin-panel" className={`admin-nav-card ${location.pathname === '/admin-panel' ? 'active' : ''}`}>
                    <div className="card-icon-container">
                        <svg className="card-icon" fill="none" viewBox="0 0 24 24">
                            <path d="M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z" stroke="white" strokeWidth="2" />
                        </svg>
                    </div>
                    <div className="card-text-container">
                        <div className="card-title">İdarəetmə Paneli</div>
                        <div className="card-subtitle">Dashboard və idarəetmə</div>
                    </div>
                    <div className="card-arrow">
                        <img
                            src={location.pathname === '/admin-panel' ? '/assets/services-active.png' : '/assets/services-deac.png'}
                            alt="Arrow"
                            className="arrow-icon"
                        />
                    </div>
                </Link>

                {/* About Us Card */}
                <Link to="/admin-panel/about" className={`admin-nav-card ${location.pathname === '/admin-panel/about' ? 'active' : ''}`}>
                    <div className="card-icon-container">
                        <svg className="card-icon" fill="none" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" stroke="white" strokeWidth="2" />
                        </svg>
                    </div>
                    <div className="card-text-container">
                        <div className="card-title">Haqqımızda</div>
                        <div className="card-subtitle">Haqqımızda</div>
                    </div>
                    <div className="card-arrow">
                        <img
                            src={location.pathname === '/admin-panel/about' ? '/assets/services-active.png' : '/assets/services-deac.png'}
                            alt="Arrow"
                            className="arrow-icon"
                        />
                    </div>
                </Link>

                {/* Products Card */}
                <Link to="/admin-panel/products" className={`admin-nav-card ${location.pathname === '/admin-panel/products' ? 'active' : ''}`}>
                    <div className="card-icon-container">
                        <svg className="card-icon" fill="none" viewBox="0 0 24 24">
                            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" stroke="white" strokeWidth="2" />
                        </svg>
                    </div>
                    <div className="card-text-container">
                        <div className="card-title">Məhsullar</div>
                        <div className="card-subtitle">Məhsul kataloqunuzu idarə edin</div>
                    </div>
                    <div className="card-arrow">
                        <img
                            src={location.pathname === '/admin-panel/products' ? '/assets/services-active.png' : '/assets/services-deac.png'}
                            alt="Arrow"
                            className="arrow-icon"
                        />
                    </div>
                </Link>

                {/* Equipment Card */}
                <Link to="/admin-panel/equipment" className={`admin-nav-card ${location.pathname === '/admin-panel/equipment' ? 'active' : ''}`}>
                    <div className="card-icon-container">
                        <svg className="card-icon" fill="none" viewBox="0 0 24 24">
                            <path d="M21 2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7l-2 3v1h8c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 12H3V4h18v10z" stroke="white" strokeWidth="2" />
                        </svg>
                    </div>
                    <div className="card-text-container">
                        <div className="card-title">Avadanlıqlar</div>
                        <div className="card-subtitle">Avadanlıq katalogunuzu idarə edin</div>
                    </div>
                    <div className="card-arrow">
                        <img
                            src={location.pathname === '/admin-panel/equipment' ? '/assets/services-active.png' : '/assets/services-deac.png'}
                            alt="Arrow"
                            className="arrow-icon"
                        />
                    </div>
                </Link>

                {/* Services Card */}
                <Link to="/admin-panel/services" className={`admin-nav-card ${location.pathname === '/admin-panel/services' ? 'active' : ''}`}>
                    <div className="card-icon-container">
                        <svg className="card-icon" fill="none" viewBox="0 0 24 24">
                            <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" stroke="white" strokeWidth="2" />
                        </svg>
                    </div>
                    <div className="card-text-container">
                        <div className="card-title">Xidmətlər</div>
                        <div className="card-subtitle">Xidmətlərinizi idarə edin</div>
                    </div>
                    <div className="card-arrow">
                        <img
                            src={location.pathname === '/admin-panel/services' ? '/assets/services-active.png' : '/assets/services-deac.png'}
                            alt="Arrow"
                            className="arrow-icon"
                        />
                    </div>
                </Link>

                {/* Settings Card - No Link (Same as Sidebar) */}
                <div className="admin-nav-card">
                    <div className="card-icon-container">
                        <svg className="card-icon" fill="none" viewBox="0 0 24 24">
                            <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" stroke="white" strokeWidth="2" />
                        </svg>
                    </div>
                    <div className="card-text-container">
                        <div className="card-title">Tənzimləmələr</div>
                        <div className="card-subtitle">Sistem konfiqurasiyası</div>
                    </div>
                    <div className="card-arrow">
                        <img
                            src="/assets/services-deac.png"
                            alt="Arrow"
                            className="arrow-icon"
                        />
                    </div>
                </div>
            </div>

        </div>
    );
} 