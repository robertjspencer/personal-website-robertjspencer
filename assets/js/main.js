(function($) {

	var	$window = $(window),
		$body = $('body'),
		$main = $('#main');

	var themeStorageKey = 'preferred-theme',
		root = document.documentElement,
		$themeToggle = $('#theme-toggle');

	function getStoredTheme() {
		try {
			return window.localStorage.getItem(themeStorageKey);
		}
		catch (error) {
			return null;
		}
	}

	function setStoredTheme(theme) {
		try {
			window.localStorage.setItem(themeStorageKey, theme);
		}
		catch (error) {}
	}

	function getActiveTheme() {
		return root.getAttribute('data-theme') || 'light';
	}

	function applyTheme(theme) {
		var nextLabel = theme === 'dark' ? 'Light mode' : 'Dark mode';

		root.setAttribute('data-theme', theme);
		root.style.colorScheme = theme;

		if ($themeToggle.length > 0) {
			$themeToggle.attr('aria-pressed', theme === 'dark' ? 'true' : 'false');
			$themeToggle.attr('title', nextLabel);
			$themeToggle.find('.theme-toggle-label').text(nextLabel);
		}
	}

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	if ($themeToggle.length > 0) {
		applyTheme(getActiveTheme());

		$themeToggle.on('click', function() {
			var nextTheme = getActiveTheme() === 'dark' ? 'light' : 'dark';

			applyTheme(nextTheme);
			setStoredTheme(nextTheme);
		});
	}

	if (window.matchMedia) {
		var themeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)'),
			handleThemeMediaChange = function(event) {
				if (getStoredTheme())
					return;

				applyTheme(event.matches ? 'dark' : 'light');
			};

		if (themeMediaQuery.addEventListener)
			themeMediaQuery.addEventListener('change', handleThemeMediaChange);
		else if (themeMediaQuery.addListener)
			themeMediaQuery.addListener(handleThemeMediaChange);
	}

	// Nav.
		var $nav = $('#nav');

		if ($nav.length > 0) {

			var $navToggle = $('#nav-toggle');

			function closeNavMenu() {
				$nav.removeClass('is-open');

				if ($navToggle.length > 0)
					$navToggle.attr('aria-expanded', 'false');
			}

			if ($navToggle.length > 0) {
				$navToggle.on('click', function() {
					var isOpen = !$nav.hasClass('is-open');

					$nav.toggleClass('is-open', isOpen);
					$navToggle.attr('aria-expanded', isOpen ? 'true' : 'false');
				});

				$(document).on('click', function(event) {
					if ($nav.hasClass('is-open') && $(event.target).closest('#nav').length == 0)
						closeNavMenu();
				});

				$(document).on('keydown', function(event) {
					if (event.key === 'Escape')
						closeNavMenu();
				});

				if (window.matchMedia) {
					var desktopNavQuery = window.matchMedia('(min-width: 737px)'),
						handleDesktopNavChange = function(event) {
							if (event.matches)
								closeNavMenu();
						};

					if (desktopNavQuery.addEventListener)
						desktopNavQuery.addEventListener('change', handleDesktopNavChange);
					else if (desktopNavQuery.addListener)
						desktopNavQuery.addListener(handleDesktopNavChange);
				}
			}

			// Shrink effect.
				$main
					.scrollex({
						mode: 'top',
						enter: function() {
							$nav.addClass('alt');
						},
						leave: function() {
							$nav.removeClass('alt');
						},
					});

			// Links and scroll-spy.
				var $nav_a = $nav.find('a'),
					navSections = [],
					lockTimer = null;

				$nav_a.each(function() {
					var $link = $(this),
						id = $link.attr('href');

					if (!id || id.charAt(0) !== '#')
						return;

					var $section = $(id);

					if ($section.length > 0)
						navSections.push({ $link: $link, $section: $section });
				});

				function updateActiveNav() {
					if ($nav_a.filter('.active-locked').length > 0)
						return;

					var scrollTop = $window.scrollTop(),
						viewportHeight = window.innerHeight || $window.height(),
						docHeight = document.documentElement.scrollHeight,
						navHeight = $nav.outerHeight() || 60;

					if (scrollTop > 0 && scrollTop + viewportHeight >= docHeight - 32 && navSections.length > 0) {
						$nav_a.removeClass('active');
						navSections[navSections.length - 1].$link.addClass('active');
						return;
					}

					var threshold = scrollTop + navHeight + Math.min(160, viewportHeight * 0.25),
						activeLink = null;

					for (var i = 0; i < navSections.length; i++) {
						if (navSections[i].$section.offset().top <= threshold)
							activeLink = navSections[i].$link;
					}

					$nav_a.removeClass('active');

					if (activeLink)
						activeLink.addClass('active');
				}

				$nav_a.on('click', function() {
					var $this = $(this),
						href = $this.attr('href');

					closeNavMenu();

					if (!href || href.charAt(0) !== '#')
						return;

					$nav_a.removeClass('active active-locked');
					$this.addClass('active active-locked');

					if (lockTimer)
						window.clearTimeout(lockTimer);

					lockTimer = window.setTimeout(function() {
						$this.removeClass('active-locked');
						lockTimer = null;
					}, 900);
				});

				$window.on('scroll resize load', updateActiveNav);
				updateActiveNav();

		}

})(jQuery);