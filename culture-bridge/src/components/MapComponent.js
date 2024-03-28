// Component to render google maps with a marker for the university on each city page

import React, { useEffect, useRef } from 'react';

const MapComponent = ({ id, lat, lng, zoom, markerPosition, markerTitle }) => {
    const propsRef = useRef({ lat, lng, zoom, markerPosition, markerTitle });

    useEffect(() => {
        propsRef.current = { lat, lng, zoom, markerPosition, markerTitle };
    }, [lat, lng, zoom, markerPosition, markerTitle]);

    useEffect(() => {
        // Access the most up to date props
        const initMap = () => {
            const { lat, lng, zoom, markerPosition, markerTitle } = propsRef.current;
            const map = new window.google.maps.Map(document.getElementById(id), {
                center: { lat, lng },
                zoom,
            });

            // University location marker and pop up window formatting
            if (markerPosition) {
                const marker = new window.google.maps.Marker({
                    position: markerPosition,
                    map: map,
                    title: markerTitle, 
                });

                const infoWindow = new window.google.maps.InfoWindow({
                    content: `
                        <div style="text-align: center;">
                            <h3 style="margin: 0; padding: 8px;">${markerTitle}</h3>
                        </div>
                    `,
                });

                marker.addListener('click', () => {
                    infoWindow.open(map, marker);
                });
            }
        };

        window.initMap = initMap;

        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA7aLKCbvGec73aVKUcJkYSLYNORRiXmwA&callback=initMap`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
            delete window.initMap; // Clean up by removing it from window
        };
    }, [id]);

    return <div id={id} className='map-section'></div>;
};

export default MapComponent;
