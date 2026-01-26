// export const SITE_URL: string = "http://127.0.0.1:8080";
// export const SITE_URL: string = "http://192.168.2.242:8080";
export const SITE_URL: string = "http://10.0.0.204:8080";

interface string_key {
    [key: string]: string
};

export const COUNTRY_CODES: string_key = {
    "Canada": "ca",
    "USA": "us",
    "Spain": "es"
}

export const SUPPORTED_LANGUAGES: string_key = {
    "English": "en",
    "French": "fr",
    "Spanish": "es",
    "Chinese": "zh"
}

export const SUPPORTED_THEMES: string_key = {
    "Light": "light",
    "Dark": "dark"
}

export const FALLBACK_LANGUAGE_CODE = 'en';

export const DEFAULT_LATITUDE = 43.5423;
export const DEFAULT_LONGITUDE = -79.6580;