/*
Scenarios: verify "rakibul" WordPress website

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
12.  Validate whether the Darkmode is working or not from the Frontend.

*/

// @ts-check
const { test, chromium } = require('@playwright/test');

let browser;

test.beforeEach(async ({ page }, testInfo) => {

    testInfo.setTimeout(testInfo.timeout + 100000);

        //force a logout before going to login in page
        await page.goto('http://localhost/rakibul/wp-login.php?action=logout&_wpnonce=64fcd1226a');

        await page.goto('http://localhost/rakibul/wp-login.php?loggedout=true&wp_lang=en_US');

        await page.getByRole('heading', { name: 'Powered by WordPress' }).isVisible(); // wordpress logo

        // Username and Password
        await page.getByText('Username or Email Address').isVisible();
        await page.getByLabel('Username or Email Address').fill('admin');
        await page.getByText('Password', { exact: true }).isVisible();
        await page.getByLabel('Password', { exact: true }).fill('admin'); 
        await page.getByLabel('Show password').click();
        await page.getByLabel('Hide password').click();

        await page.getByLabel('Remember Me').check();
        await page.getByRole('button', { name: 'Log In' }).click(); // Login

        await Promise.all([

            page.waitForNavigation({ waitUntil: 'networkidle' })
          
        ]);
});

test.beforeAll( async () =>{

    browser = await chromium.launch();

});

test.afterAll( async () =>{

    await browser.close();

});

test.describe('"rakibul" WordPress site', () => {

    test('Check whether the “WP Dark Mode” Plugin is Active or not.', async ({ page }) => {

        await page.getByRole('link', { name: 'Plugins', exact: true }).click();
        await page.getByRole('link', { name: 'Installed Plugins' }).click();
        
        // Search installed plugins
        await page.getByPlaceholder('Search installed plugins...').click();
        await page.getByPlaceholder('Search installed plugins...').fill('WP Dark Mode');
        await page.getByPlaceholder('Search installed plugins...').press('Enter');
        await page.getByRole('cell', { name: 'No plugins found for: WP Dark Mode. Search for plugins in the WordPress Plugin Directory.' }).waitFor({state: 'visible'}); // plugin is not install

        // verify from "Add New"
        await page.getByRole('link', { name: 'Plugins', exact: true }).click();
        await page.locator('#menu-plugins').getByRole('link', { name: 'Add New' }).click();
        await page.getByPlaceholder('Search plugins...').click();
        await page.getByPlaceholder('Search plugins...').fill('WP Dark Mode');
        await page.getByPlaceholder('Search plugins...').press('Enter');

        await page.getByRole('link', { name: 'WP Dark Mode – Best Dark Mode Plugin for WordPress with Social Sharing', exact: true }).waitFor({state:'visible'});
        await page.getByText('The best WordPress dark mode plugin with every feature you need: floating switch').isVisible();
        await page
            .getByText('By WPPOOL')
            .first()
            .isVisible();
        await page.getByLabel('Install WP Dark Mode – Best Dark Mode Plugin for WordPress with Social Sharing 4.2.2 now').isVisible(); // visible "Install Now" so plugin is inactive

    });

    test('If Active, navigate to the WP Dark Mode & continue. Otherwise, Install the Plugin and Activate it.', async ({ page }) => {

        await page.getByRole('link', { name: 'Plugins', exact: true }).click();
        await page.locator('#menu-plugins').getByRole('link', { name: 'Add New' }).click();

        await page.getByPlaceholder('Search plugins...').click();
        await page.getByPlaceholder('Search plugins...').fill('WP Dark Mode');
        await page.getByPlaceholder('Search plugins...').press('Enter');

        // Verify "WP Dark Mode" plugin info and Install
        await page.getByRole('link', { name: 'WP Dark Mode – Best Dark Mode Plugin for WordPress with Social Sharing', exact: true }).isVisible();
        await page.getByText('The best WordPress dark mode plugin with every feature you need: floating switch').isVisible();
        await page
            .getByText('By WPPOOL')
            .first()
            .isVisible();

        await page.getByLabel('Install WP Dark Mode – Best Dark Mode Plugin for WordPress with Social Sharing 4.2.2 now').click(); // Install Now
        await page.getByLabel('Activate WP Dark Mode &#8211; Best Dark Mode Plugin for WordPress with Social Sharing').waitFor({state:'visible'});

        // Activate the "WP Dark Mode" plugin
        await page.getByRole('link', { name: 'Plugins', exact: true }).click();
        await page.getByRole('link', { name: 'Installed Plugins' }).click();

        await page.getByText('WP Dark Mode', { exact: true }).isVisible();
        await page.getByText('WP Dark Mode automatically enables a stunning dark mode of your website based on').isVisible();
        await page.getByText('Version 4.2.2 | By WPPOOL | View details').isVisible();
        await page.getByLabel('Activate WP Dark Mode').click(); // Activate plugin

        // Verify plugin is activate
        await page.getByRole('link', { name: 'Plugins', exact: true }).click();
        await page.getByRole('link', { name: 'Installed Plugins' }).click();
        await page.getByText('Deactivate | Settings | GET PRO').isVisible(); //plugin is activate

    });

    test('Enable Backend Darkmode from Settings -> General Settings.', async ({ page }) => {

        await page.getByRole('link', { name: 'WP Dark Mode' }).click();

        // Settings
        await page
            .locator('#toplevel_page_wp-dark-mode-settings')
            .getByRole('link', { name: 'Settings' })
            .click();
        await page.getByRole('heading', { name: 'WP Dark Mode Settings' }).isVisible();

        // General Settings
        await page.getByRole('link', { name: ' General Settings' }).click();
        await page
            .getByRole('heading', { name: ' General Settings' })
            .locator('span')
            .isVisible();
        
        // verify "Backend Darkmode" info
        await page.getByText('Enable Backend Darkmode').isVisible();
        await page.getByText('Enable the backend darkmode to display a darkmode switch button in the admin bar').isVisible();

        // Enable "Backend Darkmode"
        await page
            .getByRole('row', { name: 'Enable Backend Darkmode' })
            .locator('div')
            .nth(1)
            .click();
        await page.getByRole('button', { name: 'Save Settings' }).click();

    });

    test('Validate whether the Darkmode is working or not on the Admin Dashboard.', async ({ page }) => {

        await page.getByRole('link', { name: 'Dashboard' }).click();
        await page.getByRole('link', { name: 'Home' }).click();
        await page.waitForLoadState('networkidle');
        await page.$eval('body', el => {
            const bodyBackgroundColor = getComputedStyle(el).backgroundColor;
            console.log(bodyBackgroundColor);
            if (bodyBackgroundColor === 'rgb(34, 34, 34)') {
              console.log('Darkmode is working fine!');
            } else {
              console.log('Darkmode is not working!');
            }
          });

    });
    
    test('Navigate to the WP Dark Mode.', async ({ page }) => {

        await page.getByRole('link', { name: 'Plugins', exact: true }).click();
        await page.getByRole('link', { name: 'Installed Plugins' }).click();
        
        // Search installed plugins
        await page.getByPlaceholder('Search installed plugins...').click();
        await page.getByPlaceholder('Search installed plugins...').fill('WP Dark Mode');
        await page.getByPlaceholder('Search installed plugins...').press('Enter');

        await page.getByRole('link', { name: 'WP Dark Mode', exact: true }).isVisible();
        await page.getByText('WP Dark Mode automatically enables a stunning dark mode of your website based on').isVisible();
        await page.getByText('Version 4.2.2 | By WPPOOL | View details').isVisible();

    });
    
    test('From Settings -> Switch Settings - Change the “Floating Switch Style” from the default selections (Select any one from the available options, except the default selected one).', async ({ page }) => {

        // The "Settings -> Switch Settings -> Floating Switch Style option is not available on the plugin

    });

    test('From Settings -> Switch Settings - Select Custom Switch size & Scale it to 220.', async ({ page }) => {

        // The "Settings -> Switch Settings -> Custom Switch size & Scale option is not available on the plugin

    });

    test('From Settings -> Switch Settings - Change the Floating Switch Position (Left Bottom).', async ({ page }) => {

        // The "Settings -> Switch Settings -> Floating Switch Position (Left Bottom) option is not available on the plugin

    });

    test('Disable Keyboard Shortcut from the Accessibility Settings.', async ({ page }) => {

        await page.getByRole('link', { name: 'WP Dark Mode' }).click();
        await page
            .locator('#toplevel_page_wp-dark-mode-settings')
            .getByRole('link', { name: 'Settings' })
            .click();
        
        // Accessibility Settings
        await page.getByRole('link', { name: ' Accessibility Settings' }).click();
        await page.getByText('Enable/disable the dark mode toggle shortcut. (Ctrl + ALt + D )').isVisible();

        // Disable Accessibility Settings
        await page
            .getByRole('row', { name: 'Keyboard Shortcut' })
            .locator('div')
            .nth(1)
            .click();
        await page.getByRole('button', { name: 'Save Settings' }).click(); // Save Settings

    });

    test('From Settings -> Animation - Enable “Darkmode Toggle Animation” & change the “Animation Effect” from the default selections (Select any one from the available options, except the default selected one).', async ({ page }) => {

        await page.getByRole('link', { name: 'WP Dark Mode' }).click();
        await page
            .locator('#toplevel_page_wp-dark-mode-settings')
            .getByRole('link', { name: 'Settings' })
            .click();
            
        await page.getByRole('link', { name: ' Animation' }).click(); // Animation
        await page.getByText('Enable/ disable the dark mode toggle animation between dark/white mode.').isVisible();

        // Enable “Darkmode Toggle Animation”
        await page.locator('label[for="wppool-wp_dark_mode_animation[toggle_animation]"] div[class="wp-dark-mode-ignore"]').click();
        await page.getByRole('link', { name: 'WP Dark Mode' }).click();
        await page.getByText('Select the animation effect between dark/white mode.').isVisible();

        //Animation Effect
        await page.getByLabel('Animation Effect').click();
        await page.getByLabel('Animation Effect').selectOption('pulse');
        await page.locator('#wp-dark-mode-animation-preview div').isVisible();

        // Save changes
        await page.getByRole('button', { name: 'Save Settings' }).click();

        // after changes verify Animation Effect page
        await page.getByRole('link', { name: 'WP Dark Mode' }).click();
        await page
            .locator('#toplevel_page_wp-dark-mode-settings')
            .getByRole('link', { name: 'Settings' })
            .click();
        await page.getByRole('link', { name: ' Animation' }).click();
        await page
            .getByRole('heading', { name: ' Animation' })
            .locator('span')
            .isVisible();
        await page.getByText('Darkmode Toggle Animation').isVisible();
        await page.getByText('Enable/ disable the dark mode toggle animation between dark/white mode.').isVisible();
        await page.getByText('Animation Effect', { exact: true }).isVisible();
        await page.getByText('Select the animation effect between dark/white mode.').isVisible();

    });

    test('Validate whether the Darkmode is working or not from the Frontend.', async ({ page }) => {

        await page.getByRole('link', { name: 'WP Dark Mode' }).click();
        await page
            .locator('#toplevel_page_wp-dark-mode-settings')
            .getByRole('link', { name: 'Settings' })
            .click();
        await page.getByText('Turn ON to enable the darkmode in the frontend.').isVisible(); //verify frontend darkmode is not enable
        await page
            .getByRole('row', { name: 'Enable Frontend Darkmode' })
            .getByRole('cell')
            .isVisible(); // Frontend Dakmode need to enable

    });

});