import { setupSdk } from '@matterport/sdk';
import { useRef, useState } from 'react';

// Create a singleton for the Matterport SDK
const matterportSingleton = {
  sdk: null,
  initialized: false,
  initPromise: null,
  container: null,

  initialize(containerElement, apiKey) {
    // If we're already initialized with this container, return the existing promise
    if (this.initPromise && this.container === containerElement) {
      return this.initPromise;
    }

    // Store the container reference
    this.container = containerElement;

    // Clean up previous instance if it exists
    if (this.sdk) {
      console.log('Disposing previous Matterport SDK instance');
      // this.sdk.dispose();
      if (this.container && this.container.firstChild) {
        this.container.innerHTML = ''; // Clear the container
      }
      this.sdk = null;
      this.initialized = false;
    }

    // Create a new initialization promise
    this.initPromise = (async () => {
      try {
        console.log('Initializing Matterport SDK (singleton)');
        this.sdk = await setupSdk(apiKey, {
          container: containerElement,
        });

        await this.sdk.App.state.waitUntil(
          state => state.phase === this.sdk.App.Phase.PLAYING
        );

        this.sdk.Camera.rotate(35, 0);
        this.initialized = true;
        return { success: true };
      } catch (error) {
        console.error('Error initializing Matterport SDK:', error);
        return { success: false, error: error.message };
      }
    })();

    return this.initPromise;
  },

  cleanup() {
    if (this.sdk) {
      console.log('Disposing Matterport SDK singleton');
      // this.sdk?.dispose();
      if (this.container && this.container.firstChild) {
        this.container.innerHTML = ''; // Clear the container
      }
      this.sdk = null;
      this.initialized = false;
      this.container = null;
      this.initPromise = null;
    }
  }
};

// Component that uses the singleton
const VirtualTour = () => {
  const containerRef = useRef(null);
  //   const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState(null);

  // Function to handle component mounting
  const handleMount = (node) => {
    if (!node) return; // Skip if node is null (unmounting)

    containerRef.current = node;

    // Initialize the SDK
    matterportSingleton.initialize(node, import.meta.env.VITE_Matterport)
      .then(result => {
        if (result.success) {
          //   setIsInitialized(true);
        } else {
          setError(result.error);
        }
      });
  };

  return (
    <div className="relative w-full">
      <div
        ref={handleMount}
        className="w-full"
        style={{ height: '80vh', width: '100%' }}
      >
        {/* {!isInitialized && !error && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <p>Loading virtual tour...</p>
          </div>
        )} */}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-red-50">
            <p className="text-red-500">Error: {error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Clean up the singleton when the app unmounts
// You can call this in your app's cleanup code if needed
export const cleanupMatterportSDK = () => {
  matterportSingleton.cleanup();
};

export default VirtualTour;