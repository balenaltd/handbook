### Security Guidelines<br>

### Password handling
* Use a unique password for every single website
    * Passwords leak all the time, even in cleartext
* Prefer Google login with @balena.io account whenever possible
    * Google is a lot better at authentication than service X
    * One less password to worry about
* Use a browser integrated password manager
    * Don’t use a password manager that relies on copy/pasting passwords. Most phishing attacks rely on you confusing the domain name. Browser automation defeats that
    * Don’t store 2FA recovery codes in your password manager. Store them in a secure physical location in your home
* Never give actual answers to security questions
    * Put the question you selected in the notes of your password manager entry, generate a random password and give that as your answer.
* Enable 2FA authentication in services that support it
    * Order of preference for 2FA methods:
        * Yubikey
        * Google Authenticator/Authy/etc
        * SMS
* Only rely on your memory for 2 passwords. The computer login password, and the password manager unlock password. Everything else should be in the password manager.
    * If your password manager is local, this can be the same password

### Computer access

* Select a strong and memorable login password
    * Never use that password anywhere else
* Ensure your computer requires a password on boot
    * Otherwise security is trivially bypassed with a reboot
* Ensure your computer locks itself after a certain period of inactivity
    * Should be some number less than 30 minutes
* Always lock your computer when left unattended in untrustworthy places
    * Most operating systems have a quick keyboard shortcut like WinKey+L on Windows

### Encryption

* Make sure full disk encryption is turned on
    * All modern OSes offer easy encryption of the hard drive
    * The password can be your computer login password

### Network access

* Avoid VPNs. It’s ok to use any network to connect to the internet
    * You don’t have to use a VPN, online services assume a hostile network already
    * A lot of VPN providers have shady business models
        * Most require privileged third party software to run on your computer
* (mostly for devs) Enable default deny firewall on your machine
    * Your computer will often be running development servers that shouldn’t be exposed

### Software

* Enable automatic software updates for all software on your computer
    * Do it weekly if you OS doesn’t support it (mostly Linux users)
* Install as few programs on your computer as possible to do your work
* Prefer software from the app store or official distro repos over random binaries on the internet
    * App stores and official distro repos have stricter security requirements
    * Use global {npm,pip,cargo} installs with extreme caution. They are not checked by anyone
* Do not install browser extensions except for absolutely essential ones
    * Most require full access to website data. Trivial to grab passwords and other data if any of them gets compromised
    * Verify the author of extensions is a reputable entity. I (petrosagg) trust:
        * Facebook Container (from Mozilla)
        * Octa (planned replacement of passpack in balena)
        * uBlock Origin
        * papagal (self authored)
