import { useConfig } from '../hooks/useConfig';

const Config = () => {
  const { config, loading, error, saveConfig } = useConfig();


  const handleSave = () => {
    // Example configuration data
    const newConfig = {
      theme: 'dark',
      language: 'en',
    };
    saveConfig(newConfig);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Configuration</h1>
      <pre>{JSON.stringify(config, null, 2)}</pre>
      <button onClick={handleSave}>Save Config</button>
    </div>
  );
};

export default Config;
