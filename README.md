
Parsonal_WordPress_site



## Application Under Test
URL: http://localhost/rakibul/wp-login.php?loggedout=true&wp_lang=en_US

OS: Windows 

IDE: Visual Studio Code
## Scenarios
1. Log in to your WordPress site.
2. Check whether the “WP Dark Mode” Plugin is Active or not.
3. If Active, navigate to the WP Dark Mode & continue. Otherwise, Install the Plugin and Activate it.
4. Enable Backend Darkmode from Settings -> General Settings.
5. Validate whether the Darkmode is working or not on the Admin Dashboard.
6. Navigate to the WP Dark Mode.
7. From Settings -> Switch Settings - Change the “Floating Switch Style” from the default selections (Select any one from the available options, except the default selected one).
8. From Settings -> Switch Settings - Select Custom Switch size & Scale it to 220.
9. From Settings -> Switch Settings - Change the Floating Switch Position (Left Bottom).
10. Disable Keyboard Shortcut from the Accessibility Settings.
11. From Settings -> Animation - Enable “Darkmode Toggle Animation” & change the “Animation Effect” from the default selections (Select any one from the available options, except the default selected one).
12. Validate whether the Darkmode is working or not from the Frontend.
## Clone the repository
 git clone https://github.com/RakibulIslam29/WordPress-site.git
## Install dependencies
: node.js
: npm install
: npx playwright install
## Run Application
npm run check-functionality

Expected Result: Test should pass

Actual Result: Passing tests locally
