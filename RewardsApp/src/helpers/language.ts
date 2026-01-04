export default function getDefaultLanguage(country: string): string{
    const countryLanguageMap: { [key: string]: string } = {
        'US': 'en',
        'CA': 'en',
        'ES': 'es',
    }
    return countryLanguageMap[country] || 'en';
}