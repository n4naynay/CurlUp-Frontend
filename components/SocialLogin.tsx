import { Button } from "@/components/ui/button";

export default function SocialLogin() {
  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
  };

  return (
    <div className="mt-6 sm:mt-8">
      <div className="text-center mb-4 sm:mb-6">
        <p className="text-gray-600 italic text-sm sm:text-base">or continue with</p>
      </div>

      <div className="flex justify-center space-x-4 sm:space-x-8">
        {/* Google */}
        <Button
          type="button"
          variant="ghost"
          size="lg"
          onClick={() => handleSocialLogin("Google")}
          className="p-0 hover:bg-transparent hover:scale-110 transition-transform duration-200"
        >
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-black flex items-center justify-center hover:bg-gray-50 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" className="fill-black sm:w-6 sm:h-6">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
          </div>
        </Button>

        {/* Facebook */}
        <Button
          type="button"
          variant="ghost"
          size="lg"
          onClick={() => handleSocialLogin("Facebook")}
          className="p-0 hover:bg-transparent hover:scale-110 transition-transform duration-200"
        >
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-black flex items-center justify-center hover:bg-gray-50 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" className="fill-black sm:w-6 sm:h-6">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </div>
        </Button>

        {/* Twitter */}
        <Button
          type="button"
          variant="ghost"
          size="lg"
          onClick={() => handleSocialLogin("Twitter")}
          className="p-0 hover:bg-transparent hover:scale-110 transition-transform duration-200"
        >
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-black flex items-center justify-center hover:bg-gray-50 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" className="fill-black sm:w-6 sm:h-6">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
          </div>
        </Button>
      </div>
    </div>
  );
}