declare module 'firebase/auth/react-native' {
  import { Persistence } from 'firebase/auth';

  /**
   * Provide a minimal declaration for getReactNativePersistence.
   * The storage parameter is typically AsyncStorage from @react-native-async-storage/async-storage.
   */
  export function getReactNativePersistence(storage: any): Persistence;
}
