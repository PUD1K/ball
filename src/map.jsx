import React, {useRef, useState} from 'react';
import { YMaps, Map, Placemark, Button } from 'react-yandex-maps';

const MapWithCircle = () => {
    const [jumps, setJumps] = useState(0);
    const [position, setPosition] = useState([55.801316, 49.174955]);

    let lastClick = useRef(0);
    let animationInProgress = useRef(false);

    const jump = () => {
        debugger;
        if (!animationInProgress.current) {
            animationInProgress.current = true;
            setJumps(jumps + 1);

            const initialPosition = position[0];
            const amplitude = 0.005; // Амплитуда подпрыгивания
            const frequency = 1; // Частота подпрыгивания
            const decay = 0.98; // Коэффициент затухания

            let currentPosition = initialPosition;
            let time = 0;

            const jumpInterval = setInterval(() => {
                time += 0.01;
                currentPosition = initialPosition + amplitude * Math.sin(frequency * time) * decay ** time;

                setPosition([currentPosition, position[1]]);

                if (currentPosition <= initialPosition) {
                    animationInProgress.current = false;
                    clearInterval(jumpInterval);
                }
            }, 10);
        }
    };


    return (
        <div>
            <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
                <YMaps>
                    <Map
                        defaultState={{center: [55.801316, 49.174904], zoom: 15}}
                        width="100%"
                        height="100vh"
                    >
                        <Placemark
                            geometry={position}
                            options={{
                                iconLayout: 'default#image',
                                iconImageHref: 'https://icon-icons.com/icons2/1194/PNG/512/1490886333-37-basketball_82467.png',
                                iconImageSize: [50, 50],
                                iconImageOffset: [-25, -50],
                            }}
                        />

                        <Button
                            options={{
                                maxWidth: 250,
                                selectOnClick: false,
                            }}
                            data={{content: 'Прыжок'}}
                            geometry={[55.801316, 49.174904]}
                            onClick={jump}
                        />
                    </Map>
                </YMaps>
            </div>

            <div style={{position: 'absolute', top: '30px', left: '15px'}}>
                <p>Количество прыжков: {jumps}</p>
            </div>
        </div>
    );
};

export default MapWithCircle;