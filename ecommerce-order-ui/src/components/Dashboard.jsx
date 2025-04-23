import React, {useState, useEffect} from 'react';
import {format} from 'date-fns';
import {useQuery, gql} from '@apollo/client';
import {Tabs, TabsList, TabsTrigger, TabsContent} from './ui/tabs';
import {Card, CardHeader, CardTitle, CardDescription, CardContent} from './ui/card';
import {Button} from './ui/button';
import {Badge} from './ui/badge';
import {Skeleton} from './ui/skeleton';
import {Alert, AlertTitle, AlertDescription} from './ui/alert';
import {Spinner} from './ui/spinner';


const GET_ORDERS = gql`
    query GetOrders {
        placedOrders {
            order
            origin
            total
            createdAt
            items {
                name
                qty
                cost
                currency
                image
            }
        }
    }
`;

const formatDate = (dateString) => {
    return format(new Date(dateString), 'PPpp');
};

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [activeTab, setActiveTab] = useState('overview');

    const [stats, setStats] = useState({
        totalOrders: 0,
        totalValue: 0,
        webOrders: 0,
        mobileOrders: 0
    });

    const {loading: queryLoading, error: queryError, data} = useQuery(GET_ORDERS);

    useEffect(() => {
        if (data && data.placedOrders) {
            const ordersData = data.placedOrders;
            setOrders(ordersData);
            setFilteredOrders(ordersData);
            setLoading(false);

            const webOrders = ordersData.filter(order => order.origin === 'web').length;
            const mobileOrders = ordersData.filter(order => order.origin === 'mobile').length;
            const totalValue = ordersData.reduce((sum, order) => sum + order.total, 0);

            setStats({
                totalOrders: ordersData.length,
                totalValue,
                webOrders,
                mobileOrders
            });
        }
    }, [data]);

    useEffect(() => {
        if (queryError) {
            setError('Failed to load orders. Please try again later.');
            setLoading(false);
        }
    }, [queryError]);

    useEffect(() => {
        setLoading(queryLoading);
    }, [queryLoading]);

    if (loading) {
        return (
            <div className="container mx-auto p-4">
                <div className="flex justify-center items-center mb-8">
                    <Spinner size="lg"/>
                    <span className="ml-2 text-lg">Loading dashboard...</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {[...Array(4)].map((_, i) => (
                        <Card key={i}>
                            <CardHeader>
                                <Skeleton className="h-4 w-1/2 mb-2"/>
                                <Skeleton className="h-8 w-3/4"/>
                            </CardHeader>
                            <CardContent>
                                <Skeleton className="h-12 w-full"/>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <Card>
                    <CardHeader>
                        <Skeleton className="h-6 w-1/4 mb-2"/>
                    </CardHeader>
                    <CardContent>
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="mb-4">
                                <Skeleton className="h-24 w-full"/>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto p-4">
                <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <header className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Ecommerce Order Dashboard</h1>
                <p className="text-muted-foreground">View and manage your orders</p>
            </header>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
                <TabsList className="mb-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="orders">Orders</TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardDescription>Total Orders</CardDescription>
                                <CardTitle className="text-3xl">{stats.totalOrders}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-xs text-muted-foreground">
                                    All orders in the system
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardDescription>Total Value</CardDescription>
                                <CardTitle className="text-3xl">R${stats.totalValue.toFixed(2)}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-xs text-muted-foreground">
                                    Combined value of all orders
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <CardTitle>Recent Orders</CardTitle>
                                <Button variant="outline" size="sm" onClick={() => setActiveTab('orders')}>
                                    View All
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {
                                filteredOrders.length === 0 ? (
                                        <Alert>
                                            <AlertTitle>No orders found</AlertTitle>
                                            <AlertDescription>
                                                No orders are available in the system.
                                            </AlertDescription>
                                        </Alert>
                                    ) :
                                    orders.slice(0, 3).map((order) => (
                                        <Card key={order.order} className="mb-4">
                                            <CardHeader className="pb-2">
                                                <div className="flex justify-between items-center">
                                                    <CardTitle className="text-lg">{order.order}</CardTitle>
                                                    <Badge variant={order.origin === 'web' ? 'default' : 'secondary'}>
                                                        {order.origin}
                                                    </Badge>
                                                </div>
                                                <CardDescription>{formatDate(order.createdAt)}</CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <p className="text-sm text-muted-foreground">
                                                            {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                                                        </p>
                                                    </div>
                                                    <p className="font-medium">R${order.total.toFixed(2)}</p>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="orders">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                        <div className="flex items-center gap-2">
                            <h2 className="text-2xl font-bold">All Orders</h2>
                            <Badge>{filteredOrders.length}</Badge>
                        </div>
                    </div>

                    {filteredOrders.length === 0 ? (
                        <Alert>
                            <AlertTitle>No orders found</AlertTitle>
                            <AlertDescription>
                                No orders are available in the system.
                            </AlertDescription>
                        </Alert>
                    ) : (
                        filteredOrders.map((order) => (
                            <Card key={order.order} className="mb-4">
                                <CardHeader>
                                    <div className="flex flex-col md:flex-row justify-between md:items-center">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <CardTitle>{order.order}</CardTitle>
                                                <Badge variant={order.origin === 'web' ? 'default' : 'secondary'}>
                                                    {order.origin}
                                                </Badge>
                                            </div>
                                            <CardDescription>{formatDate(order.createdAt)}</CardDescription>
                                        </div>
                                        <div className="mt-2 md:mt-0">
                                            <p className="text-xl font-bold">R${order.total.toFixed(2)}</p>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <h4 className="font-medium mb-2">Items:</h4>
                                    <div className="space-y-2">
                                        {order.items.map((item, index) => (
                                            <div key={index} className="flex items-start p-2 rounded-md border">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-12 h-12 object-cover rounded-md mr-4"
                                                />
                                                <div className="flex-1">
                                                    <p className="font-medium">{item.name}</p>
                                                    <div className="flex justify-between items-center mt-1">
                                                        <p className="text-sm text-muted-foreground">Quantity: {item.qty}</p>
                                                        <p className="font-medium">{item.currency} {item.cost.toFixed(2)}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </TabsContent>
            </Tabs>

            <footer className="mt-8 text-center text-sm text-muted-foreground">
                <p>&copy; {new Date().getFullYear()} Ecommerce Order System</p>
            </footer>
        </div>
    );
};

export default Dashboard;
