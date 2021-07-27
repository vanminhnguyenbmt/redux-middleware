import i18n_en from 'src/shared/i18n/en.json';
import i18n_vi from 'src/shared/i18n/vi.json';

export const I18nConfig = {
    en: i18n_en,
    vi: i18n_vi
}

export const ApiURI = {
    TODO: 'todos',
};

export const AppURI = {
    INDEX: '/',
    NOT_FOUND: '/404',
    HOME: '/home'
};

export const HttpStatus = {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    PAYMENT_REQUIRED: 402,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    REQUEST_TIMEOUT: 408,
    INTERNAL_SERVER_ERROR: 500,
    SERVICE_UNAVAILABLE: 503,
};

Object.freeze(ApiURI);
Object.freeze(AppURI);
Object.freeze(HttpStatus);
