import React, { useState, useEffect } from 'react';
import './styles.css';

const BridgeGame: React.FC = () => {
  const [runde, setRunde] = useState(1);
  const [vinner, setVinner] = useState<number | null>(null);
  const [meldinger, setMeldinger] = useState<string[]>([]);
  const [spillereHender, setSpillereHender] = useState<string[][]>([[], []]);

  const spillKortAutomatisk = async () => {
    setVinner(null);
    setMeldinger([]);
    setSpillereHender([[], []]);

    const kortstokk = genererKortstokk();
    const kortspillEffekter: string[] = [];

    for (let i = 0; i < 6; i++) {
      await delay(1000); // Vent i 1 sekund mellom hver handling

      const tilfeldigIndeks = Math.floor(Math.random() * kortstokk.length);
      const trukketKort = kortstokk.splice(tilfeldigIndeks, 1)[0];
      kortspillEffekter.push(`Spiller kort: ${trukketKort}`);
      setMeldinger((prevMeldinger) => [...prevMeldinger, `Spiller kort: ${trukketKort}`]);

      const spillerIndeks = i % 2;
      setSpillereHender((prevHender) => {
        const nyeHender = [...prevHender];
        nyeHender[spillerIndeks].push(trukketKort);
        return nyeHender;
      });

      if (i === 5) {
        await delay(500); // Vent i 0.5 sekund før visning av resultater
        visResultater();
      }
    }
  };

  const visResultater = () => {
    const lag1Score = Math.floor(Math.random() * 10);
    const lag2Score = Math.floor(Math.random() * 10);

    setMeldinger((prevMeldinger) => [
      ...prevMeldinger,
      `Runde ${runde}: Lag 1 score - ${lag1Score}, Lag 2 score - ${lag2Score}`,
    ]);

    if (lag1Score >= 10 || lag2Score >= 10) {
      setVinner(lag1Score >= 10 ? 1 : 2);
    }

    setRunde((prevRunde) => prevRunde + 1);
  };

  const genererKortstokk = () => {
    const kortTyper = ['Hjerter', 'Spar', 'Kløver', 'Ruter'];
    const kortVerdier = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    return kortTyper.flatMap((type) => kortVerdier.map((verdi) => `${verdi} ${type}`));
  };

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    if (runde === 1) {
      spillKortAutomatisk();
    }
  }, [runde]);

  return (
    <div className="bridge-game">
      {vinner !== null && <div>Vinneren er Lag {vinner}</div>}
      <div className="spiller-container">
        {spillereHender.map((hånd, indeks) => (
          <div key={indeks} className={`spiller-hånd spiller-${indeks}`}>
            {hånd.map((kort, kortIndeks) => (
              <div key={kortIndeks} className="kort">
                {kort}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="meldinger">
        {meldinger.map((melding, index) => (
          <p key={index}>{melding}</p>
        ))}
      </div>
      <button onClick={spillKortAutomatisk}>Start Spill</button>
    </div>
  );
};

export default BridgeGame;
