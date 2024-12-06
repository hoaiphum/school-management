const Announcements = () => {
    return (
        <div className="bg-white p-4 rounded-md">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold">Announcements</h1>
                <span className="text-xs text-gray-400">View all</span>
            </div>
            <div className="flex flex-col gap-4 mt-4">
                <div className="bg-schoolSkyLight rounded-md p-4">
                    <div className="flex items-center justify-between">
                        <h2 className="font-medium">Lorem ipsum dolor sit</h2>
                        <span className="text-xs text-gray-400 bg-white rounded-md p-1">2025-01-01</span>
                    </div>
                    <p className="text-sm to-gray-400 mt-1">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto cupiditate molestias
                        voluptatum assumenda harum
                    </p>
                </div>
                <div className="bg-schoolPurpleLight rounded-md p-4">
                    <div className="flex items-center justify-between">
                        <h2 className="font-medium">Lorem ipsum dolor sit</h2>
                        <span className="text-xs text-gray-400 bg-white rounded-md p-1">2025-01-01</span>
                    </div>
                    <p className="text-sm to-gray-400 mt-1">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto cupiditate molestias
                        voluptatum assumenda harum
                    </p>
                </div>
                <div className="bg-schoolYellowLight rounded-md p-4">
                    <div className="flex items-center justify-between">
                        <h2 className="font-medium">Lorem ipsum dolor sit</h2>
                        <span className="text-xs text-gray-400 bg-white rounded-md p-1">2025-01-01</span>
                    </div>
                    <p className="text-sm to-gray-400 mt-1">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto cupiditate molestias
                        voluptatum assumenda harum
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Announcements;
