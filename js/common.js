// check if need to show pop up
$( document ).ready(function() {

    // detect if it is in browser / standalone
    let displayMode = 'browser';
    const mqStandAlone = '(display-mode: standalone)';
    if (navigator.standalone || window.matchMedia(mqStandAlone).matches) {
        displayMode = 'standalone';
    }

    if (displayMode == 'browser') {

        // encourage download as PWA
        const divInstall = document.getElementById('installContainer');
        const butInstall = document.getElementById('btn-install');
        const butCancel = document.getElementById('btn-install-cancel');

    
        // link to service worker
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('service-worker.js').then(reg => {
                // registration worked
                console.log('[Service Worker] Registration succeeded. Scope is ' + reg.scope);
            }).catch(error => {
                // registration failed
                console.log('[Service Worker] Registration failed with ' + error);
            });
        }
    
        window.addEventListener('beforeinstallprompt', (event) => {
            console.log('👍', 'beforeinstallprompt', event);
            // Stash the event so it can be triggered later.
            window.deferredPrompt = event;
            // Remove the 'hidden' class from the install button container
            divInstall.classList.toggle('hidden', false);
        });
    
        butInstall.addEventListener('click', async () => {
            console.log('👍', 'butInstall-clicked');
            const promptEvent = window.deferredPrompt;
            if (!promptEvent) {
                // The deferred prompt isn't available.
                return;
            }
            // Show the install prompt.
            promptEvent.prompt();
            // Log the result
            const result = await promptEvent.userChoice;
            console.log('👍', 'userChoice', result);
            // Reset the deferred prompt variable, since
            // prompt() can only be called once.
            window.deferredPrompt = null;
            // Hide the install button.
            divInstall.classList.toggle('hidden', true);
        });

    
        butCancel.addEventListener('click', async () => {
            console.log('lol', 'butCancel-clicked');
            divInstall.classList.toggle('hidden', true);
            return;
        });
    
        window.addEventListener('appinstalled', (event) => {
            console.log('👍', 'appinstalled', event);
            // Clear the deferredPrompt so it can be garbage collected
            window.deferredPrompt = null;
        });

    }

    setTimeout(function () {
        // is new user
        if ($('.is-new-user').length > 0 && page != 'setting') {
            new jBox('Confirm', {
                confirmButton: '即刻設定！',
                content: '您好，歡迎您使用《實體聚會》，請您喺正式開始使用前，喺設定到填寫你嘅姓名同電話號碼先啦！',
                confirm: function(){
                    window.location.href = './setting.php'
                }
            }).open();

            var selectModal = $('.jBox-wrapper.jBox-Confirm.jBox-Default.jBox-Modal').eq($('.jBox-wrapper.jBox-Confirm.jBox-Default.jBox-Modal').length-1);
            selectModal.find('.jBox-Confirm-button.jBox-Confirm-button-cancel').remove();
            selectModal.find('.jBox-Confirm-button.jBox-Confirm-button-submit').css("width", "100%");
        }
    }, 100);    
});


// function onBackKeyDown() {
//     //Retrieve app's history
//     var history = App.getHistory();
 
//     //Check that there's only one screen in history (the current one):
//     if ( history.length === 1 ) {
//         //Check that this element is the default (home) screen:
//         var history_screen = history[0];
//         if ( TemplateTags.getDefaultRouteLink().replace('#','') === history_screen.fragment ) {
//             //Only one element in history and this element is default screen: exit app on back button:
//             navigator.app.exitApp();
//             return;
//         }
//     }
 
//     //History has at least one previous element: just go back to it:
//     navigator.app.backHistory();
// }


function showAlertBox(content) {
    new jBox('Notice', {
        theme: 'NoticeFancy',
        attributes: {
          x: 'left',
          y: 'bottom'
        },
        audio: "sound/error",
        content: content,
        volume: 80,
        animation: {
          open: 'slide:bottom',
          close: 'slide:left'
        }
    });
}

// if ('serviceWorker' in navigator) {

//     navigator.serviceWorker.getRegistrations().then(function(registrations) {

//     for(let registration of registrations) {

//             registration.unregister()

//     }}).catch(function(err) {

//         console.log('Service Worker registration failed: ', err);

//     });
// }


