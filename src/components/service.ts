import { action, observable } from 'mobx';

type SnackbarMessage = {
  duration: number;
  message: string;
};

class ComponentService {
  @observable
  isLoading = false;

  @observable
  snackbar: SnackbarMessage | null = null;

  @action
  showSnackbar(message: string, duration: number = 5000) {
    this.snackbar = { duration, message };
  }
}

export default new ComponentService();
