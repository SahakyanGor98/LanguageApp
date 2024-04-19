export interface IReduxState {
    auth: {
        accessToken: string;
        userId: string;
    };
    error: {
        errorMessage: string
    };
    loading: {
        isLoading: boolean;
    };
    theme: {
        isLight: boolean;
    };
}
