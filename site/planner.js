(() => {
  "use strict";

  const storageKeys = {
    trips: "co-travel-planner-trips-v1",
    profile: "co-travel-preference-profile-v1",
    communityRatings: "co-travel-community-ratings-v1",
  };

  const copy = {
    en: {
      brandTagline: "Trips shaped around you",
      discover: "Discover",
      planTrip: "Plan a trip",
      myTrips: "My trips",
      travelTools: "Travel tools",
      newTrip: "New trip",
      heroEyebrow: "Your pace. Your trip.",
      heroTitle: "Plan easy. Travel more like yourself.",
      heroBody: "Tell us what matters to you and your companions. Co-Travel turns those preferences into three practical trip plans you can compare and customize.",
      officialSources: "Official-source travel checks",
      groupPreferences: "Companion-aware preferences",
      destination: "Destination",
      quickDestinationPlaceholder: "Where do you want to go?",
      tripRoute: "Trip route",
      singleCity: "One destination",
      multiCity: "Multi-city route",
      multiCityHint: "Build an ordered route and choose how many nights to spend in each city.",
      citiesAndNights: "Cities and nights",
      routeOrderHint: "Arrange the cities in the order you will visit them.",
      addCity: "Add another city",
      city: "City",
      cityNights: "Nights",
      moveCityUp: "Move city up",
      moveCityDown: "Move city down",
      removeCity: "Remove city",
      routeSnapshot: "Route snapshot",
      multiCityError: "Add at least two different cities and one or more nights in each city.",
      dates: "Dates",
      duration: "Duration",
      startPlanning: "Start planning",
      communityEyebrow: "Community inspiration",
      recommendedTrips: "Trips travelers love",
      recommendedBody: "Use a highly rated plan as a starting point, then adapt it around your dates and preferences.",
      forYou: "For you",
      preferenceEyebrow: "More than a destination search",
      preferenceTitle: "A plan that understands the group",
      paceTitle: "Pace that fits",
      paceBody: "Slow mornings or full days become part of the itinerary structure.",
      balanceTitle: "Companion balance",
      balanceBody: "Must-haves, flexible preferences, and vetoes stay separate.",
      reuseTitle: "Smarter reuse",
      reuseBody: "Strong community plans are adapted instead of rebuilt from zero.",
      plannerEyebrow: "Personalized trip builder",
      plannerTitle: "Let’s learn how your group likes to travel",
      plannerBody: "Your answers create a shared preference profile. Hard requirements are always respected.",
      basicsTitle: "Start with the trip basics",
      basicsBody: "These are used as hard filters before matching reusable trip plans.",
      departureCity: "Departure city",
      startDate: "Start date",
      nights: "Nights",
      groupType: "Who is traveling?",
      groupSolo: "Solo",
      groupCouple: "Couple",
      groupFriends: "Friends",
      groupFamily: "Family",
      groupMulti: "Multi-generational group",
      budgetStyle: "Budget style",
      budgetValue: "Value conscious",
      budgetComfort: "Comfort",
      budgetPremium: "Premium",
      companionNames: "Companion names",
      destinationPlaceholder: "City or country",
      originPlaceholder: "For example, Tel Aviv",
      companionsPlaceholder: "Optional — for example, Maya and Dan",
      styleTitle: "Choose the rhythm that feels right",
      styleBody: "Pick one answer in each row. There are no “correct” choices.",
      paceQuestion: "A perfect morning starts…",
      paceSlowTitle: "Slowly",
      paceSlowBody: "Breakfast first, plans later",
      paceBalancedTitle: "Balanced",
      paceBalancedBody: "One clear plan, no rush",
      paceActiveTitle: "Early",
      paceActiveBody: "Make the most of the day",
      structureQuestion: "How much should be decided in advance?",
      structureOpenTitle: "Keep it open",
      structureOpenBody: "Decide as we go",
      structureAnchorsTitle: "Key anchors",
      structureAnchorsBody: "Book the important parts",
      structurePlannedTitle: "Plan it well",
      structurePlannedBody: "Know what comes next",
      crowdsQuestion: "A famous sight is busiest at noon. What sounds best?",
      crowdsAvoidTitle: "Find a quiet alternative",
      crowdsAvoidBody: "Atmosphere over checklist",
      crowdsTimedTitle: "Go at a quieter time",
      crowdsTimedBody: "See it without the peak crowd",
      crowdsIconicTitle: "See the icon",
      crowdsIconicBody: "It is famous for a reason",
      interestsTitle: "What should this trip make room for?",
      interestsBody: "Choose the interests that matter, then add any non-negotiable requirements.",
      tripInterests: "Trip interests",
      interestFood: "Local food",
      interestCulture: "Culture",
      interestArchitecture: "Architecture",
      interestNature: "Nature",
      interestNightlife: "Nightlife",
      interestShopping: "Shopping",
      interestWellness: "Wellness",
      interestFamily: "Family activities",
      interestEvents: "Shows & events",
      mobility: "Mobility needs",
      mobilityNone: "No special requirements",
      mobilityLowWalking: "Limit long walking days",
      mobilityStepFree: "Step-free routes needed",
      dietary: "Dietary needs",
      dietaryPlaceholder: "Optional — vegetarian, allergies, kosher…",
      mustHave: "Must-have or avoid",
      constraintsPlaceholder: "For example: one beach day, avoid late nights, museum for Maya",
      rememberProfile: "Remember this preference profile on this device",
      rememberProfileBody: "You can remove it later from My trips. Nothing is uploaded by this static demo.",
      back: "Back",
      continue: "Continue",
      createPlans: "Create my three plans",
      savedEyebrow: "Your travel workspace",
      savedTitle: "Saved and published trips",
      savedBody: "Plans are stored only in this browser in the current MVP.",
      quickError: "Add a destination, start date, and a valid number of nights to continue.",
      plannerError: "Complete the destination, start date, and number of nights before continuing.",
      officialCheck: "Official check required",
      resultEyebrow: "Three ways to travel",
      resultHeading: "Choose your starting plan",
      resultHelper: "Each option uses the same dates and hard requirements with a different pace and focus.",
      travelReadiness: "Travel readiness",
      readinessOpenBody: "Review passport, entry authorization, and health checks",
      readinessModalEyebrow: "Before you travel",
      checkRequirements: "Check official requirements",
      readinessWarning: "Regulations are not cached as final answers. Verify passport, visa, transit, and health rules from official sources before booking.",
      destinationSnapshot: "Destination snapshot",
      planningIdeas: "Explore more in this destination",
      planningIdeasBody: "Actual named sights, museums, parks, markets, and cultural venues are scanned automatically for this destination.",
      planningIdeasNote: "Place data is refreshed from OpenStreetMap. Opening hours, event schedules, prices, and availability still need confirmation before booking.",
      scanDestination: "Scan destination",
      scanComplete: "Destination activities refreshed.",
      scanLoading: "Finding actual places and venues near this destination…",
      scanEmpty: "No reliable named activities were found for this destination yet.",
      scanFailed: "Live activity scan is temporarily unavailable. Try scanning again.",
      placeWebsite: "Venue website",
      osmAttribution: "Place data © OpenStreetMap contributors",
      allIdeas: "All",
      places: "Places",
      foodExperiences: "Food",
      eventsFilter: "Events & venues",
      addToTrip: "Add",
      addedToTrip: "Added",
      officialGuide: "Guide",
      addedPlacement: "Added to Day {day} at {time}.",
      alreadyAdded: "This idea is already in the selected plan.",
      moreInfo: "More information",
      placeDetails: "Place details",
      eventDetails: "Event details",
      activityDetails: "Activity details",
      viewOnMaps: "View on Google Maps",
      restaurantResults: "Restaurants in this area",
      closeDetails: "Close details",
      eventTimingNote: "Event schedules and availability can change. Confirm the exact date and booking requirements before finalizing the trip.",
      placePlanningNote: "Use this as a planning starting point. Check current opening hours, access information, and travel time before booking.",
      activityTime: "Time for {activity}",
      dragActivity: "Drag {activity} to another time or day",
      previousDay: "Move to previous day",
      scheduleUpdated: "Trip schedule updated.",
      deleteActivity: "Delete activity",
      activityRemoved: "Activity removed from the trip.",
      saveTrip: "Save trip",
      saved: "Saved",
      customize: "Customize",
      publish: "Publish locally",
      published: "Published locally",
      share: "Copy share link",
      editPreferences: "Edit preferences",
      preferenceFit: "Preference fit",
      groupProfile: "Shared travel style",
      generatedSignals: "Built from your planner answers",
      reusedTemplate: "This option reused a highly rated community structure and adapted it to your preferences.",
      originalPlan: "Original plan created for this request.",
      emptySaved: "No saved trips yet",
      emptySavedBody: "Create a personalized plan or customize a community trip to start your collection.",
      openTrip: "Open trip",
      deleteTrip: "Delete",
      usePlan: "Customize this trip",
      saveIdea: "Save idea",
      viewTrip: "View trip",
      backToTrips: "Back to trips",
      storyEyebrow: "Your trip starts here",
      tripHighlights: "Moments from the journey",
      tripJourney: "Your trip, day by day",
      tripAtGlance: "Trip at a glance",
      createdBy: "Created by",
      sitesIncluded: "places and experiences",
      downloadPdf: "Download PDF",
      saveThisTrip: "Save trip",
      tripAlreadySaved: "Trip saved",
      rateThisTrip: "Rate this trip",
      ratingThanks: "Thanks for rating this trip.",
      pdfDownloaded: "Your trip PDF has been downloaded.",
      pdfFailed: "We could not create the PDF. Please try again.",
      dayLabel: "Day",
      viewOnMap: "View on map",
      tripSaved: "Trip saved on this device.",
      ideaSaved: "Community idea saved as a customizable trip.",
      tripPublished: "Trip published to the local demo feed.",
      linkCopied: "Share link copied.",
      linkCopyFailed: "Your browser could not copy the link.",
      passport: "Passport",
      passportBody: "Add traveler details in the official checker",
      entryRules: "Entry authorization",
      entryRulesBody: "Verify for every traveler and transit point",
      healthSafety: "Health and safety",
      healthSafetyBody: "Review current official destination guidance",
      currency: "Currency",
      timeZone: "Time zone",
      character: "Trip character",
      weather: "Current weather",
      weatherLoading: "Checking weather…",
      weatherUnavailable: "Weather unavailable",
      ratePlan: "Rate this plan",
      ratingSaved: "Rating saved on this device.",
      browserOnly: "Browser-only MVP",
      browserOnlyBody: "Social publishing and ratings are visible on this device until a shared backend is added.",
      oneClickBrand: "One-click plan",
      oneClickTitle: "Already booked? Turn your reservation into a trip plan.",
      oneClickBody: "Upload a flight ticket or reservation PDF, image, or text file. We’ll read the dates and route privately in your browser, then ask only what we still need.",
      processedLocally: "Processed locally",
      uploadReservation: "Upload reservation",
      oneClickHint: "We’ll prefill destinations, route order, dates, duration, and travelers.",
      oneClickReading: "Reading your reservation privately in this browser…",
      oneClickReady: "Reservation found. Please confirm the detected details below.",
      oneClickMultiReady: "Multi-city reservation found. Please confirm the detected route below.",
      oneClickIncomplete: "We read the file, but could not find a clear destination. Review the extracted details in Travel tools.",
      oneClickFailed: "We could not read this file. Try a text-based PDF, a clearer image, or the reservation scanner in Travel tools.",
      or: "or",
      detectedTrip: "Detected trip details",
      confirmDetectedTrip: "Confirm the details before we continue",
      detectedTripHelp: "If anything looks wrong, open the planner and edit it before creating the trip.",
      departure: "Departure",
      route: "Route",
      travelers: "Travelers",
      notDetected: "Not detected",
      editDetails: "Review and edit",
      confirmDetails: "Confirm and continue",
      toolsEyebrow: "Practical travel support",
      toolsTitle: "Everything your trip needs, in one calm place.",
      toolsBody: "Scan reservations, check official entry requirements, find government visa services, and explore destination essentials.",
    },
    he: {
      brandTagline: "טיולים שמתאימים לכם",
      discover: "גילוי",
      planTrip: "תכנון טיול",
      myTrips: "הטיולים שלי",
      travelTools: "כלי נסיעה",
      newTrip: "טיול חדש",
      heroEyebrow: "הקצב שלכם. הטיול שלכם.",
      heroTitle: "מתכננים בקלות. מטיילים יותר בדרך שלכם.",
      heroBody: "ספרו לנו מה חשוב לכם ולשותפים לנסיעה. Co-Travel יוצר שלוש תוכניות מעשיות שאפשר להשוות ולהתאים.",
      officialSources: "בדיקות נסיעה ממקורות רשמיים",
      groupPreferences: "העדפות המותאמות לכל הקבוצה",
      destination: "יעד",
      quickDestinationPlaceholder: "היכן תרצו לטייל",
      tripRoute: "מסלול הטיול",
      singleCity: "יעד אחד",
      multiCity: "מסלול רב-עירוני",
      multiCityHint: "בנו מסלול לפי סדר הביקור ובחרו כמה לילות להקדיש לכל עיר.",
      citiesAndNights: "ערים ולילות",
      routeOrderHint: "סדרו את הערים לפי סדר הביקור.",
      addCity: "הוספת עיר נוספת",
      city: "עיר",
      cityNights: "לילות",
      moveCityUp: "העברת העיר למעלה",
      moveCityDown: "העברת העיר למטה",
      removeCity: "הסרת עיר",
      routeSnapshot: "תקציר המסלול",
      multiCityError: "הוסיפו לפחות שתי ערים שונות ולילה אחד או יותר בכל עיר.",
      dates: "תאריכים",
      duration: "משך",
      startPlanning: "התחלת תכנון",
      communityEyebrow: "השראה מהקהילה",
      recommendedTrips: "טיולים שמטיילים אוהבים",
      recommendedBody: "התחילו מתוכנית מדורגת היטב והתאימו אותה לתאריכים ולהעדפות שלכם.",
      forYou: "בשבילכם",
      preferenceEyebrow: "יותר מחיפוש יעד",
      preferenceTitle: "תוכנית שמבינה את הקבוצה",
      paceTitle: "קצב שמתאים",
      paceBody: "בקרים איטיים או ימים מלאים הופכים לחלק ממבנה הטיול.",
      balanceTitle: "איזון בין השותפים",
      balanceBody: "רצונות, גמישות וקווים אדומים נשמרים בנפרד.",
      reuseTitle: "שימוש חוזר חכם",
      reuseBody: "תוכניות קהילה חזקות מותאמות במקום להיבנות מחדש.",
      plannerEyebrow: "בונה טיולים אישי",
      plannerTitle: "בואו נלמד איך הקבוצה אוהבת לטייל",
      plannerBody: "התשובות יוצרות פרופיל העדפות משותף. דרישות מחייבות תמיד נשמרות.",
      basicsTitle: "מתחילים בפרטי הטיול",
      basicsBody: "הפרטים משמשים כמסננים לפני התאמת תוכניות קיימות.",
      departureCity: "עיר יציאה",
      startDate: "תאריך התחלה",
      nights: "לילות",
      groupType: "מי נוסע?",
      groupSolo: "לבד",
      groupCouple: "זוג",
      groupFriends: "חברים",
      groupFamily: "משפחה",
      groupMulti: "קבוצה רב-דורית",
      budgetStyle: "סגנון תקציב",
      budgetValue: "חסכוני",
      budgetComfort: "נוח",
      budgetPremium: "פרימיום",
      companionNames: "שמות השותפים",
      destinationPlaceholder: "עיר או מדינה",
      originPlaceholder: "לדוגמה, תל אביב",
      companionsPlaceholder: "אופציונלי — לדוגמה, מאיה ודן",
      styleTitle: "בחרו את הקצב שמתאים לכם",
      styleBody: "בחרו תשובה אחת בכל שורה. אין תשובה נכונה.",
      paceQuestion: "בוקר מושלם מתחיל...",
      paceSlowTitle: "לאט ובנחת",
      paceSlowBody: "מתחילים בארוחת בוקר, ממשיכים בלי לחץ",
      paceBalancedTitle: "מאוזן",
      paceBalancedBody: "תוכנית ברורה אחת, בלי למהר",
      paceActiveTitle: "מתחילים מוקדם",
      paceActiveBody: "מנצלים את היום במלואו",
      structureQuestion: "כמה מהטיול צריך להיות סגור מראש?",
      structureOpenTitle: "משאירים פתוח",
      structureOpenBody: "מחליטים תוך כדי",
      structureAnchorsTitle: "עוגנים מרכזיים",
      structureAnchorsBody: "מזמינים מראש את הדברים החשובים",
      structurePlannedTitle: "מתכננים מראש",
      structurePlannedBody: "יודעים מה השלב הבא",
      crowdsQuestion: "אתר מפורסם עמוס בצהריים. מה עדיף?",
      crowdsAvoidTitle: "מחפשים חלופה שקטה",
      crowdsAvoidBody: "האווירה חשובה יותר מרשימת הספקים",
      crowdsTimedTitle: "מגיעים בשעה שקטה יותר",
      crowdsTimedBody: "רואים בלי עומס השיא",
      crowdsIconicTitle: "רואים את אתר החובה",
      crowdsIconicBody: "הוא מפורסם מסיבה טובה",
      interestsTitle: "למה חשוב לפנות מקום בטיול?",
      interestsBody: "בחרו תחומי עניין והוסיפו דרישות שאינן ניתנות לפשרה.",
      tripInterests: "תחומי עניין בטיול",
      interestFood: "אוכל מקומי",
      interestCulture: "תרבות",
      interestArchitecture: "אדריכלות",
      interestNature: "טבע",
      interestNightlife: "חיי לילה",
      interestShopping: "קניות",
      interestWellness: "בריאות ורוגע",
      interestFamily: "פעילויות למשפחה",
      interestEvents: "מופעים ואירועים",
      mobility: "צרכי ניידות",
      mobilityNone: "אין דרישות מיוחדות",
      mobilityLowWalking: "להגביל ימי הליכה ארוכים",
      mobilityStepFree: "נדרשים מסלולים ללא מדרגות",
      dietary: "צרכים תזונתיים",
      dietaryPlaceholder: "אופציונלי — צמחונות, אלרגיות, כשרות...",
      mustHave: "חובה או להימנע",
      constraintsPlaceholder: "לדוגמה: יום חוף אחד, בלי לילות מאוחרים, מוזיאון למאיה",
      rememberProfile: "שמירת פרופיל ההעדפות במכשיר הזה",
      rememberProfileBody: "אפשר להסיר אותו מאוחר יותר. בגרסה הזו דבר לא נשלח לשרת.",
      back: "חזרה",
      continue: "המשך",
      createPlans: "יצירת שלוש התוכניות שלי",
      savedEyebrow: "סביבת הנסיעות שלכם",
      savedTitle: "טיולים שמורים ומפורסמים",
      savedBody: "בגרסה הנוכחית התוכניות נשמרות בדפדפן בלבד.",
      quickError: "הוסיפו יעד, תאריך התחלה ומספר לילות תקין כדי להמשיך.",
      plannerError: "השלימו יעד, תאריך התחלה ומספר לילות לפני ההמשך.",
      officialCheck: "נדרשת בדיקה רשמית",
      resultEyebrow: "שלוש דרכים לטייל",
      resultHeading: "בחרו תוכנית התחלתית",
      resultHelper: "כל אפשרות משתמשת באותם תאריכים ודרישות, עם קצב ומיקוד שונים.",
      travelReadiness: "מוכנות לנסיעה",
      readinessOpenBody: "בדקו דרכון, אישור כניסה והנחיות בריאות",
      readinessModalEyebrow: "לפני הנסיעה",
      checkRequirements: "בדיקת דרישות רשמיות",
      readinessWarning: "כללי כניסה אינם נשמרים כתשובה סופית. יש לבדוק דרכון, ויזה, מעבר ובריאות במקורות רשמיים לפני הזמנה.",
      destinationSnapshot: "תמונת מצב על היעד",
      planningIdeas: "עוד דברים שאפשר לגלות ביעד",
      planningIdeasBody: "אתרים, מוזיאונים, פארקים, שווקים ומוקדי תרבות אמיתיים נסרקים אוטומטית עבור היעד.",
      planningIdeasNote: "נתוני המקומות מתעדכנים מ-OpenStreetMap. עדיין יש לאמת שעות פתיחה, מועדי אירועים, מחירים וזמינות לפני ההזמנה.",
      scanDestination: "סריקת היעד",
      scanComplete: "הפעילויות ביעד עודכנו.",
      scanLoading: "מחפשים מקומות ומוקדי פעילות אמיתיים ליד היעד...",
      scanEmpty: "עדיין לא נמצאו פעילויות מזוהות ואמינות עבור היעד הזה.",
      scanFailed: "סריקת הפעילויות אינה זמינה כרגע. נסו לסרוק שוב.",
      placeWebsite: "אתר המקום",
      osmAttribution: "נתוני מקומות © תורמי OpenStreetMap",
      allIdeas: "הכול",
      places: "מקומות",
      foodExperiences: "אוכל",
      eventsFilter: "אירועים ומופעים",
      addToTrip: "הוספה",
      addedToTrip: "נוסף",
      officialGuide: "מדריך",
      addedPlacement: "נוסף ליום {day} בשעה {time}.",
      alreadyAdded: "הרעיון הזה כבר נמצא בתוכנית שנבחרה.",
      moreInfo: "מידע נוסף",
      placeDetails: "פרטי המקום",
      eventDetails: "פרטי האירוע",
      activityDetails: "פרטי הפעילות",
      viewOnMaps: "הצגה במפות Google",
      restaurantResults: "מסעדות באזור הזה",
      closeDetails: "סגירת הפרטים",
      eventTimingNote: "לוחות זמנים וזמינות של אירועים עשויים להשתנות. יש לאשר את התאריך המדויק ואת דרישות ההזמנה לפני סיום התכנון.",
      placePlanningNote: "השתמשו בזה כנקודת התחלה לתכנון. בדקו שעות פתיחה, מידע על גישה וזמן נסיעה עדכניים לפני ההזמנה.",
      activityTime: "שעה עבור {activity}",
      dragActivity: "גררו את {activity} לשעה או ליום אחר",
      previousDay: "העברה ליום הקודם",
      scheduleUpdated: "לוח הזמנים של הטיול עודכן.",
      deleteActivity: "מחיקת פעילות",
      activityRemoved: "הפעילות הוסרה מהטיול.",
      saveTrip: "שמירת טיול",
      saved: "נשמר",
      customize: "התאמה אישית",
      publish: "פרסום מקומי",
      published: "פורסם מקומית",
      share: "העתקת קישור",
      editPreferences: "עריכת העדפות",
      preferenceFit: "התאמה להעדפות",
      groupProfile: "סגנון הנסיעה המשותף",
      generatedSignals: "נבנה מתשובות התכנון",
      reusedTemplate: "אפשרות זו השתמשה במבנה קהילתי מדורג והתאימה אותו להעדפות שלכם.",
      originalPlan: "תוכנית מקורית שנוצרה לבקשה הזו.",
      emptySaved: "עדיין אין טיולים שמורים",
      emptySavedBody: "צרו תוכנית אישית או התאימו טיול מהקהילה כדי להתחיל אוסף.",
      openTrip: "פתיחת טיול",
      deleteTrip: "מחיקה",
      usePlan: "התאמת הטיול",
      saveIdea: "שמירת רעיון",
      viewTrip: "צפייה בטיול",
      backToTrips: "חזרה לטיולים",
      storyEyebrow: "הטיול שלכם מתחיל כאן",
      tripHighlights: "רגעים מהטיול",
      tripJourney: "המסלול יום אחר יום",
      tripAtGlance: "הטיול במבט אחד",
      createdBy: "נוצר על ידי",
      sitesIncluded: "אתרים וחוויות",
      downloadPdf: "הורדת PDF",
      saveThisTrip: "שמירת הטיול",
      tripAlreadySaved: "הטיול נשמר",
      rateThisTrip: "דרגו את הטיול",
      ratingThanks: "תודה על הדירוג.",
      pdfDownloaded: "קובץ ה-PDF של הטיול הורד.",
      pdfFailed: "לא הצלחנו ליצור את קובץ ה-PDF. נסו שוב.",
      dayLabel: "יום",
      viewOnMap: "צפייה במפה",
      tripSaved: "הטיול נשמר במכשיר הזה.",
      ideaSaved: "רעיון הקהילה נשמר כטיול שניתן להתאים.",
      tripPublished: "הטיול פורסם בפיד המקומי של ההדגמה.",
      linkCopied: "הקישור הועתק.",
      linkCopyFailed: "הדפדפן לא הצליח להעתיק את הקישור.",
      passport: "דרכון",
      passportBody: "הוסיפו פרטי נוסעים בבודק הרשמי",
      entryRules: "אישור כניסה",
      entryRulesBody: "יש לבדוק עבור כל נוסע וכל מעבר",
      healthSafety: "בריאות ובטיחות",
      healthSafetyBody: "בדקו הנחיות יעד רשמיות ועדכניות",
      currency: "מטבע",
      timeZone: "אזור זמן",
      character: "אופי הטיול",
      weather: "מזג אוויר כעת",
      weatherLoading: "בודקים את מזג האוויר…",
      weatherUnavailable: "מזג האוויר אינו זמין",
      ratePlan: "דירוג התוכנית",
      ratingSaved: "הדירוג נשמר במכשיר הזה.",
      browserOnly: "גרסת דפדפן",
      browserOnlyBody: "פרסום ודירוגים חברתיים נראים במכשיר הזה עד להוספת שרת משותף.",
      oneClickBrand: "תכנון בלחיצה אחת",
      oneClickTitle: "כבר הזמנתם? הפכו את ההזמנה לתוכנית טיול.",
      oneClickBody: "העלו כרטיס טיסה או הזמנה כ-PDF, תמונה או קובץ טקסט. נקרא את המסלול והתאריכים בדפדפן ונשאל רק מה שחסר.",
      processedLocally: "עיבוד מקומי",
      uploadReservation: "העלאת הזמנה",
      oneClickHint: "היעדים, סדר המסלול, התאריכים, המשך והנוסעים ימולאו מראש.",
      oneClickReading: "קוראים את ההזמנה באופן פרטי בדפדפן…",
      oneClickReady: "ההזמנה נמצאה. אשרו את הפרטים שזוהו למטה.",
      oneClickMultiReady: "נמצאה הזמנה רב-עירונית. אשרו את המסלול שזוהה למטה.",
      oneClickIncomplete: "הקובץ נקרא, אך לא נמצא יעד ברור. בדקו את הפרטים שחולצו בכלי הנסיעה.",
      oneClickFailed: "לא הצלחנו לקרוא את הקובץ. נסו PDF עם טקסט, תמונה ברורה יותר או את סורק ההזמנות בכלי הנסיעה.",
      or: "או",
      detectedTrip: "פרטי הטיול שזוהו",
      confirmDetectedTrip: "אשרו את הפרטים לפני שממשיכים",
      detectedTripHelp: "אם משהו אינו נכון, פתחו את המתכנן וערכו אותו לפני יצירת הטיול.",
      departure: "יציאה",
      route: "מסלול",
      travelers: "נוסעים",
      notDetected: "לא זוהה",
      editDetails: "בדיקה ועריכה",
      confirmDetails: "אישור והמשך",
      toolsEyebrow: "סיוע מעשי לנסיעה",
      toolsTitle: "כל מה שהטיול צריך, במקום אחד רגוע.",
      toolsBody: "סרקו הזמנות, בדקו דרישות כניסה רשמיות, מצאו שירותי ויזה ממשלתיים וקבלו מידע שימושי על היעד.",
    },
  };

  const destinationCatalog = [
    ["Abu Dhabi", "אבו דאבי"],
    ["Amsterdam", "אמסטרדם"],
    ["Athens", "אתונה"],
    ["Auckland", "אוקלנד"],
    ["Bali", "באלי"],
    ["Bangkok", "בנגקוק"],
    ["Barcelona", "ברצלונה"],
    ["Berlin", "ברלין"],
    ["Brussels", "בריסל"],
    ["Budapest", "בודפשט"],
    ["Buenos Aires", "בואנוס איירס"],
    ["Cairo", "קהיר"],
    ["Cape Town", "קייפטאון"],
    ["Copenhagen", "קופנהגן"],
    ["Dublin", "דבלין"],
    ["Dubai", "דובאי"],
    ["Edinburgh", "אדינבורו"],
    ["Eilat", "אילת"],
    ["Florence", "פירנצה"],
    ["Geneva", "ז'נבה"],
    ["Hanoi", "האנוי"],
    ["Helsinki", "הלסינקי"],
    ["Heraklion", "הרקליון"],
    ["Ho Chi Minh City", "הו צ'י מין סיטי"],
    ["Hong Kong", "הונג קונג"],
    ["Istanbul", "איסטנבול"],
    ["Jerusalem", "ירושלים"],
    ["Kyoto", "קיוטו"],
    ["Larnaca", "לרנקה"],
    ["Lisbon", "ליסבון"],
    ["London", "לונדון"],
    ["Los Angeles", "לוס אנג'לס"],
    ["Madrid", "מדריד"],
    ["Marrakesh", "מרקש"],
    ["Melbourne", "מלבורן"],
    ["Mexico City", "מקסיקו סיטי"],
    ["Milan", "מילאנו"],
    ["Montreal", "מונטריאול"],
    ["Munich", "מינכן"],
    ["Naples", "נאפולי"],
    ["New York", "ניו יורק"],
    ["Osaka", "אוסקה"],
    ["Oslo", "אוסלו"],
    ["Paphos", "פאפוס"],
    ["Paris", "פריז"],
    ["Porto", "פורטו"],
    ["Prague", "פראג"],
    ["Queenstown", "קווינסטאון"],
    ["Rhodes", "רודוס"],
    ["Rio de Janeiro", "ריו דה ז'ניירו"],
    ["Rome", "רומא"],
    ["San Francisco", "סן פרנסיסקו"],
    ["Santorini", "סנטוריני"],
    ["Seoul", "סיאול"],
    ["Seville", "סביליה"],
    ["Singapore", "סינגפור"],
    ["Stockholm", "סטוקהולם"],
    ["Sydney", "סידני"],
    ["Tel Aviv", "תל אביב"],
    ["Thessaloniki", "סלוניקי"],
    ["Tokyo", "טוקיו"],
    ["Toronto", "טורונטו"],
    ["Valencia", "ולנסיה"],
    ["Venice", "ונציה"],
    ["Vienna", "וינה"],
    ["Zurich", "ציריך"],
  ].map(([en, he]) => ({ en, he }));

  const cityPhotoOverrides = {
    "tel aviv": {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Skylines_of_Tel_Aviv-Yafo.jpg?width=1600",
      page: "https://commons.wikimedia.org/wiki/File:Skylines_of_Tel_Aviv-Yafo.jpg",
      credit: "Yair Haklai · CC BY-SA 4.0",
      sourceName: "Wikimedia Commons",
      alt: "Tel Aviv skyline and Mediterranean coast",
    },
  };

  const destinationLibrary = {
    lisbon: {
      name: "Lisbon",
      country: "Portugal",
      currency: "EUR",
      timeZone: "UTC+1",
      character: "hills · tiles · river light",
      visual: "visual-lisbon",
      highlights: ["Alfama and its viewpoints", "Belém riverside and monuments", "Chiado and Bairro Alto", "LX Factory and Alcântara", "Sintra day trip", "Cascais coast"],
      events: ["Alfama evening market", "Local design studios", "Fado performance", "Riverside food market"],
      recommendations: [
        { id: "lis-alfama", title: "Alfama and Santa Luzia viewpoint", category: "sight", area: "Alfama", bestTime: "morning", duration: 120, icon: "landmark", detail: "Historic lanes, tiled façades, and a city viewpoint.", source: "https://www.visitlisboa.com/en/p/only-in-lisbon" },
        { id: "lis-belem", title: "Belém monuments and riverside", category: "sight", area: "Belém", bestTime: "morning", duration: 180, icon: "building-2", detail: "Cluster Jerónimos, the waterfront, and the historic district.", source: "https://www.visitlisboa.com/en/p/only-in-lisbon" },
        { id: "lis-tiles", title: "National Tile Museum", category: "sight", area: "Xabregas", bestTime: "afternoon", duration: 120, icon: "palette", detail: "A focused indoor stop for Portuguese tile history.", source: "https://www.visitlisboa.com/en/p/only-in-lisbon" },
        { id: "lis-lx", title: "LX Factory and Alcântara", category: "neighborhood", area: "Alcântara", bestTime: "afternoon", duration: 150, icon: "store", detail: "Independent shops, design studios, cafés, and street art.", source: "https://www.visitlisboa.com/en/p/only-in-lisbon" },
        { id: "lis-market", title: "Riverside food market", category: "food", area: "Cais do Sodré", bestTime: "afternoon", duration: 90, icon: "utensils", detail: "A flexible tasting stop with options for different preferences.", source: "https://www.visitlisboa.com/en/p/only-in-lisbon" },
        { id: "lis-fado", title: "Small-venue Fado evening", category: "event", area: "Alfama", bestTime: "evening", duration: 120, icon: "music-2", detail: "Check the official calendar and reserve after confirming the date.", source: "https://www.visitlisboa.com/en/events" },
        { id: "lis-sintra", title: "Sintra day trip", category: "daytrip", area: "Sintra", bestTime: "morning", duration: 420, icon: "train-front", detail: "A full-day change of scenery; advance booking may be useful.", source: "https://www.visitlisboa.com/en/p/only-in-lisbon" },
        { id: "lis-cascais", title: "Cascais coast reset", category: "nature", area: "Cascais", bestTime: "morning", duration: 360, icon: "waves", detail: "Coastal air, a walkable center, and flexible beach time.", source: "https://www.visitlisboa.com/en/p/only-in-lisbon" },
      ],
      photo: { src: "https://images.unsplash.com/photo-1611135459835-0d49a7c56c1c?auto=format&fit=crop&w=1200&q=82", page: "https://unsplash.com/photos/yellow-and-white-tram-on-road-near-white-concrete-building-during-daytime-tXAsBFXszNE", credit: "Freguesia de Estrela", alt: "A yellow tram on a Lisbon street" },
    },
    athens: {
      name: "Athens",
      country: "Greece",
      currency: "EUR",
      timeZone: "UTC+3",
      character: "ancient layers · lively streets",
      visual: "visual-athens",
      highlights: ["Acropolis and the south slope", "Plaka and Anafiotika", "Ancient Agora", "National Garden and Syntagma", "Stavros Niarchos waterfront", "Cape Sounion sunset"],
      events: ["Open-air cinema", "Neighborhood food walk", "Live rebetiko music", "Local makers market"],
      recommendations: [
        { id: "ath-acropolis", title: "Acropolis and Acropolis Museum", category: "sight", area: "Acropolis", bestTime: "morning", duration: 240, icon: "landmark", detail: "Place early to reduce heat and peak crowd pressure.", source: "https://www.thisisathens.org/museums-and-antiquities/attractions" },
        { id: "ath-plaka", title: "Plaka and Anafiotika lanes", category: "neighborhood", area: "Plaka", bestTime: "morning", duration: 150, icon: "footprints", detail: "Historic streets, small museums, and Cycladic-style lanes.", source: "https://www.thisisathens.org/neighbourhoods/plaka-guide" },
        { id: "ath-agora", title: "Ancient Agora", category: "sight", area: "Monastiraki", bestTime: "morning", duration: 120, icon: "columns-3", detail: "An archaeological stop that pairs naturally with Plaka.", source: "https://www.thisisathens.org/museums-and-antiquities/attractions" },
        { id: "ath-garden", title: "National Garden and Syntagma", category: "nature", area: "Syntagma", bestTime: "afternoon", duration: 90, icon: "trees", detail: "A lower-intensity green break near central sights.", source: "https://www.thisisathens.org/museums-and-antiquities/attractions" },
        { id: "ath-hill", title: "Lycabettus Hill sunset", category: "sight", area: "Lycabettus", bestTime: "evening", duration: 120, icon: "sunset", detail: "A city panorama best placed late in the day.", source: "https://www.thisisathens.org/museums-and-antiquities/attractions" },
        { id: "ath-cinema", title: "Open-air cinema", category: "event", area: "Thissio", bestTime: "evening", duration: 150, icon: "film", detail: "Seasonal screenings; confirm program and language closer to travel.", source: "https://www.thisisathens.org/events" },
        { id: "ath-food", title: "Neighborhood food walk", category: "food", area: "Historic Centre", bestTime: "afternoon", duration: 150, icon: "utensils", detail: "Market tastes and local specialties with dietary checks.", source: "https://www.thisisathens.org/" },
        { id: "ath-niarchos", title: "Stavros Niarchos waterfront", category: "culture", area: "Kallithea", bestTime: "afternoon", duration: 180, icon: "music", detail: "Architecture, gardens, and cultural programming in one cluster.", source: "https://www.thisisathens.org/events" },
      ],
      photo: { src: "https://images.unsplash.com/photo-1767030958973-0182f487a385?auto=format&fit=crop&w=1200&q=82", page: "https://unsplash.com/photos/ancient-ruins-atop-a-rocky-hill-under-a-cloudy-sky-7f5r1Oi17ac", credit: "Jocelyn Allen", alt: "The Acropolis above Athens" },
    },
    rome: {
      name: "Rome",
      country: "Italy",
      currency: "EUR",
      timeZone: "UTC+2",
      character: "history · piazzas · long lunches",
      visual: "visual-rome",
      highlights: ["Colosseum and Roman Forum", "Trastevere lanes", "Pantheon and Piazza Navona", "Vatican Museums", "Villa Borghese", "Appian Way"],
      events: ["Evening piazza walk", "Seasonal food market", "Small-group art tour", "Neighborhood cooking class"],
      recommendations: [
        { id: "rom-colosseum", title: "Colosseum and Roman Forum", category: "sight", area: "Colosseo", bestTime: "morning", duration: 240, icon: "landmark", detail: "Keep this as a reserved anchor and verify entry times.", source: "https://www.turismoroma.it/en/places" },
        { id: "rom-pantheon", title: "Pantheon and Piazza Navona", category: "sight", area: "Historic Centre", bestTime: "morning", duration: 150, icon: "columns-3", detail: "A walkable historic cluster with minimal transfers.", source: "https://www.turismoroma.it/en/places" },
        { id: "rom-vatican", title: "Vatican Museums", category: "sight", area: "Vatican", bestTime: "morning", duration: 240, icon: "gallery-horizontal-end", detail: "A high-demand visit that should be confirmed before other stops.", source: "https://www.turismoroma.it/en/places" },
        { id: "rom-trastevere", title: "Trastevere neighborhood evening", category: "neighborhood", area: "Trastevere", bestTime: "evening", duration: 180, icon: "footprints", detail: "Lanes, small restaurants, and an easy evening atmosphere.", source: "https://www.turismoroma.it/en/places" },
        { id: "rom-borghese", title: "Villa Borghese gardens", category: "nature", area: "Villa Borghese", bestTime: "afternoon", duration: 150, icon: "trees", detail: "A lower-intensity green break between cultural days.", source: "https://www.turismoroma.it/en/places/palazzo-borghese" },
        { id: "rom-appian", title: "Appian Way exploration", category: "sight", area: "Appia Antica", bestTime: "morning", duration: 240, icon: "bike", detail: "A spacious archaeological route away from the central crowds.", source: "https://www.turismoroma.it/en/places" },
        { id: "rom-testaccio", title: "Testaccio food market", category: "food", area: "Testaccio", bestTime: "afternoon", duration: 120, icon: "utensils", detail: "A practical lunch stop centered on Roman food culture.", source: "https://www.turismoroma.it/en/places" },
        { id: "rom-live", title: "Rome Live cultural event", category: "event", area: "Rome", bestTime: "evening", duration: 150, icon: "ticket", detail: "Choose a dated performance only after checking the official calendar.", source: "https://turismoroma.it/en/romalive" },
      ],
      photo: { src: "https://images.unsplash.com/photo-1509024644558-2f56ce76c490?auto=format&fit=crop&w=1200&q=82", page: "https://unsplash.com/photos/photo-of-colosseum-during-golden-hour-lUO-BjCiZEA", credit: "Dario Veronesi", alt: "The Colosseum in Rome at golden hour" },
    },
    tokyo: {
      name: "Tokyo",
      country: "Japan",
      currency: "JPY",
      timeZone: "UTC+9",
      character: "precision · contrast · discovery",
      visual: "visual-tokyo",
      highlights: ["Asakusa and Sensō-ji", "Meiji Shrine and Harajuku", "Daikanyama and Nakameguro", "Ueno museums", "Tsukiji outer market", "Kamakura day trip"],
      events: ["Seasonal neighborhood festival", "Small jazz venue", "Craft market", "Evening food alley"],
      recommendations: [
        { id: "tok-asakusa", title: "Asakusa and Sensō-ji", category: "sight", area: "Asakusa", bestTime: "morning", duration: 180, icon: "landmark", detail: "Temple grounds, Nakamise, and traditional streets in one cluster.", source: "https://www.gotokyo.org/en/destinations/eastern-tokyo/asakusa/" },
        { id: "tok-meiji", title: "Meiji Shrine and Yoyogi", category: "sight", area: "Harajuku", bestTime: "morning", duration: 150, icon: "trees", detail: "A forested shrine visit that pairs with nearby neighborhoods.", source: "https://www.gotokyo.org/en/spot/76/index.html" },
        { id: "tok-hama", title: "Hamarikyu Gardens", category: "nature", area: "Shiodome", bestTime: "afternoon", duration: 120, icon: "flower-2", detail: "A quiet garden break with Edo-period context.", source: "https://www.gotokyo.org/en/see-and-do/attractions/" },
        { id: "tok-tsukiji", title: "Tsukiji outer market", category: "food", area: "Tsukiji", bestTime: "morning", duration: 120, icon: "utensils", detail: "Best placed early; check dietary needs before choosing vendors.", source: "https://www.gotokyo.org/en/see-and-do/attractions/" },
        { id: "tok-kappabashi", title: "Kappabashi kitchenware street", category: "shopping", area: "Asakusa", bestTime: "afternoon", duration: 120, icon: "shopping-bag", detail: "Specialist shops and distinctive food-culture souvenirs.", source: "https://www.gotokyo.org/en/destinations/eastern-tokyo/asakusa/" },
        { id: "tok-ueno", title: "Ueno museum afternoon", category: "culture", area: "Ueno", bestTime: "afternoon", duration: 210, icon: "museum", detail: "Select one museum rather than overloading the day.", source: "https://www.gotokyo.org/en/see-and-do/attractions/" },
        { id: "tok-waterbus", title: "Asakusa waterbus to Odaiba", category: "experience", area: "Sumida River", bestTime: "afternoon", duration: 150, icon: "ship", detail: "A scenic transfer that can replace a cross-city train segment.", source: "https://www.gotokyo.org/en/story/walks-and-tours/asakusa/index.html" },
        { id: "tok-calendar", title: "Seasonal Tokyo event", category: "event", area: "Tokyo", bestTime: "evening", duration: 150, icon: "calendar-heart", detail: "Select a dated festival or event from the official calendar.", source: "https://www.gotokyo.org/en/calendar/index.html" },
      ],
      photo: { src: "https://images.unsplash.com/photo-1746555702228-5c4f5436d4b7?auto=format&fit=crop&w=1200&q=82", page: "https://unsplash.com/photos/a-street-leads-to-the-tokyo-skytree-X2ZaMSASu_c", credit: "Zeke Tucker", alt: "A Tokyo street leading toward Tokyo Skytree" },
    },
    barcelona: {
      name: "Barcelona",
      country: "Spain",
      currency: "EUR",
      timeZone: "UTC+2",
      character: "design · sea · late dinners",
      visual: "visual-coast",
      highlights: ["Sagrada Família", "Gothic Quarter", "Gràcia neighborhood", "Montjuïc", "Barceloneta coast", "Sant Antoni market"],
      events: ["Neighborhood design market", "Live music evening", "Local food tasting", "Waterfront cultural event"],
      recommendations: [
        { id: "bcn-sagrada", title: "Sagrada Família", category: "sight", area: "Eixample", bestTime: "morning", duration: 150, icon: "landmark", detail: "A timed landmark visit; confirm tickets before placing nearby stops.", source: "https://www.barcelona.cat/en/what-to-do-in-bcn" },
        { id: "bcn-gothic", title: "Gothic Quarter walk", category: "neighborhood", area: "Ciutat Vella", bestTime: "morning", duration: 150, icon: "footprints", detail: "Historic lanes and plazas clustered into one walk.", source: "https://www.barcelona.cat/en/what-to-do-in-bcn" },
        { id: "bcn-guell", title: "Park Güell", category: "sight", area: "Gràcia", bestTime: "morning", duration: 150, icon: "trees", detail: "Architecture and open space; verify timed access.", source: "https://www.barcelona.cat/en/what-to-do-in-bcn" },
        { id: "bcn-montjuic", title: "Montjuïc afternoon", category: "culture", area: "Montjuïc", bestTime: "afternoon", duration: 240, icon: "mountain", detail: "Choose a museum, gardens, and viewpoint without extra transfers.", source: "https://www.barcelona.cat/en/what-to-do-in-bcn" },
        { id: "bcn-market", title: "Sant Antoni market and lunch", category: "food", area: "Sant Antoni", bestTime: "afternoon", duration: 120, icon: "utensils", detail: "A flexible food stop with surrounding neighborhood streets.", source: "https://www.barcelona.cat/en/what-to-do-in-bcn" },
        { id: "bcn-water", title: "Barceloneta waterfront", category: "nature", area: "Barceloneta", bestTime: "afternoon", duration: 150, icon: "waves", detail: "A lower-structure coastal break close to the old city.", source: "https://www.barcelona.cat/en/what-to-do-in-bcn" },
        { id: "bcn-event", title: "Barcelona city event", category: "event", area: "Barcelona", bestTime: "evening", duration: 150, icon: "calendar-heart", detail: "Choose a dated item from the official city agenda.", source: "https://www.barcelona.cat/en/what-to-do-in-bcn" },
      ],
    },
  };

  const genericDestination = (destination) => ({
    name: destination || "Your destination",
    country: "Destination",
    currency: "Verify",
    timeZone: "Verify",
    character: "local highlights · your pace",
    visual: "visual-coast",
    highlights: ["Historic center orientation", "Signature neighborhood", "Local market and food district", "Museum or cultural landmark", "Green space and viewpoint", "Easy day trip"],
    events: ["Local market", "Seasonal cultural event", "Live performance", "Community food experience"],
    recommendations: [],
  });

  const communityTrips = [
    { id: "community-lisbon-5", destination: "Lisbon", title: "Lisbon without the rush", summary: "Five days of viewpoints, small restaurants, tiled streets, and one coastal reset.", nights: 5, category: ["city", "coast", "culture"], tags: ["food", "culture", "slow"], rating: 4.8, ratings: 126, saves: 482, visual: "visual-lisbon", creator: "Noa & Amir" },
    { id: "community-athens-4", destination: "Athens", title: "Ancient Athens, local evenings", summary: "Landmarks early, neighborhood tavernas later, with enough space to wander.", nights: 4, category: ["city", "culture"], tags: ["culture", "food", "architecture"], rating: 4.7, ratings: 89, saves: 314, visual: "visual-athens", creator: "Elena K." },
    { id: "community-tokyo-7", destination: "Tokyo", title: "Tokyo by neighborhood", summary: "A structured but breathable route that avoids crossing the city unnecessarily.", nights: 7, category: ["city", "culture"], tags: ["food", "shopping", "culture"], rating: 4.9, ratings: 211, saves: 730, visual: "visual-tokyo", creator: "Kenji Travels" },
    { id: "community-rome-5", destination: "Rome", title: "Rome: piazzas over checklists", summary: "Essential history balanced with long lunches, quieter streets, and evening walks.", nights: 5, category: ["city", "culture"], tags: ["architecture", "food", "slow"], rating: 4.8, ratings: 174, saves: 590, visual: "visual-rome", creator: "Marta L." },
  ];

  const communityTripStories = {
    "community-lisbon-5": {
      lead: "Wake to tiled streets, follow the yellow trams uphill, and let Lisbon unfold one viewpoint and neighborhood table at a time.",
      gallery: [
        { title: "The tram-lined old city", src: "https://images.unsplash.com/photo-1611135459835-0d49a7c56c1c?auto=format&fit=crop&w=1500&q=84", page: "https://unsplash.com/photos/yellow-and-white-tram-on-road-near-white-concrete-building-during-daytime-tXAsBFXszNE", credit: "Freguesia de Estrela", alt: "A yellow tram on a Lisbon street" },
        { title: "Lisbon at street level", src: "https://images.unsplash.com/photo-1761063814564-c1954e8d5dd2?auto=format&fit=crop&w=1500&q=84", page: "https://unsplash.com/photos/yellow-tram-on-a-street-in-lisbon-lprFbViCWjM", credit: "Vitalijs Barilo", alt: "A classic tram on a narrow Lisbon street" },
        { title: "A riverside pause in Belém", src: "https://images.unsplash.com/photo-1749649868333-c3de17887c3b?auto=format&fit=crop&w=1500&q=84", page: "https://unsplash.com/photos/people-are-visiting-the-belem-tower-in-lisbon-portugal-jj0x3RKPfUY", credit: "Fausto Ribeiro", alt: "Belém Tower beside the river in Lisbon" },
      ],
    },
    "community-athens-4": {
      lead: "Begin among the stones of the Acropolis, then descend into shaded lanes, lively squares, and long Athenian evenings.",
      gallery: [
        { title: "The Acropolis above the city", src: "https://images.unsplash.com/photo-1767030958973-0182f487a385?auto=format&fit=crop&w=1500&q=84", page: "https://unsplash.com/photos/ancient-ruins-atop-a-rocky-hill-under-a-cloudy-sky-7f5r1Oi17ac", credit: "Jocelyn Allen", alt: "The Acropolis above Athens" },
        { title: "Ancient Athens in warm light", src: "https://images.unsplash.com/photo-1602769247692-126fdf1f1da6?auto=format&fit=crop&w=1500&q=84", page: "https://unsplash.com/photos/qGtpTQrN7VU", credit: "Despina Galani", alt: "Ancient architecture in Athens" },
        { title: "The lanes around Plaka", src: "https://images.unsplash.com/photo-1684196922832-f1caa34e6a14?auto=format&fit=crop&w=1500&q=84", page: "https://unsplash.com/photos/sukW98lrXy4", credit: "Matt Cramblett", alt: "A picturesque street in Athens" },
      ],
    },
    "community-tokyo-7": {
      lead: "Move with Tokyo's rhythm: quiet temple mornings, precise neighborhood hops, tiny food counters, and streets that glow after dark.",
      gallery: [
        { title: "Tokyo by neighborhood", src: "https://images.unsplash.com/photo-1746555702228-5c4f5436d4b7?auto=format&fit=crop&w=1500&q=84", page: "https://unsplash.com/photos/a-street-leads-to-the-tokyo-skytree-X2ZaMSASu_c", credit: "Zeke Tucker", alt: "A Tokyo street leading toward Tokyo Skytree" },
        { title: "The energy of Shibuya", src: "https://images.unsplash.com/photo-1547448526-5e9d57fa28f7?auto=format&fit=crop&w=1500&q=84", page: "https://unsplash.com/photos/tokyo-japan-streets-DGsqL2j028E", credit: "Timo Volz", alt: "Crowds crossing a Tokyo street at night" },
        { title: "Lantern-lit Tokyo nights", src: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1500&q=84", page: "https://unsplash.com/photos/people-walking-on-road-near-well-lit-buildings-layMbSJ3YOE", credit: "Jezael Melgoza", alt: "A lively Tokyo street illuminated at night" },
      ],
    },
    "community-rome-5": {
      lead: "Let Rome arrive in layers: ancient stone at opening time, fountains between espresso stops, and unhurried dinners across the river.",
      gallery: [
        { title: "The Colosseum at golden hour", src: "https://images.unsplash.com/photo-1509024644558-2f56ce76c490?auto=format&fit=crop&w=1500&q=84", page: "https://unsplash.com/photos/photo-of-colosseum-during-golden-hour-lUO-BjCiZEA", credit: "Dario Veronesi", alt: "The Colosseum in Rome at golden hour" },
        { title: "Trevi Fountain between walks", src: "https://images.unsplash.com/photo-1569397906655-7a1fce6866d2?auto=format&fit=crop&w=1500&q=84", page: "https://unsplash.com/photos/trevi-fountain-rome-italy-R71bfM2BZiI", credit: "Alex Azabache", alt: "Trevi Fountain in Rome" },
        { title: "A grand Roman piazza", src: "https://images.unsplash.com/photo-1744481606489-3397b248bc9d?auto=format&fit=crop&w=1500&q=84", page: "https://unsplash.com/photos/st-peters-basilica-and-piazza-in-rome-Dq_ndU0PY_4", credit: "Flora Orosz", alt: "St Peter's Basilica and piazza in Rome" },
      ],
    },
  };

  const state = {
    view: "discover",
    step: 1,
    filter: "all",
    currentTrip: null,
    storyTrip: null,
    storyReturnView: "discover",
    option: "balanced",
    routeMode: "single",
    routeStops: [
      { id: "route-stop-1", city: "", nights: 3 },
      { id: "route-stop-2", city: "", nights: 2 },
    ],
    recommendationFilter: "all",
    recommendationCity: "",
    scanOffset: 0,
    sourcePlanId: null,
    pendingReservation: null,
    draggedActivity: null,
    timeSliderDrag: null,
    scheduleSliderTimer: null,
    preferences: { pace: "balanced", structure: "balanced", crowds: "timed" },
  };
  const destinationScanCache = new Map();
  const cityPhotoCache = new Map();
  const weatherCache = new Map();
  let routeStopSequence = 2;
  const itineraryDayStartMinutes = 7 * 60;
  const itineraryDayEndMinutes = 23 * 60;

  const byId = (id) => document.getElementById(id);
  const plannerApp = byId("plannerApp");
  const legacyTools = byId("legacyTools");
  const quickPlanForm = byId("quickPlanForm");
  const tripPlannerForm = byId("tripPlannerForm");
  const communityTripGrid = byId("communityTripGrid");
  const savedTripsGrid = byId("savedTripsGrid");
  const tripResultContent = byId("tripResultContent");
  const tripStoryContent = byId("tripStoryContent");
  const toast = byId("plannerToast");
  const itineraryDetailModal = byId("itineraryDetailModal");
  const travelReadinessModal = byId("travelReadinessModal");
  const travelRequirementsHost = byId("travelRequirementsHost");
  let detailReturnFocus = null;
  let readinessReturnFocus = null;
  let requirementsPanelParent = null;
  let requirementsPanelNextSibling = null;
  let heroRotationIndex = 0;
  let heroRotationPaused = false;

  initialize();

  function initialize() {
    setDefaultDates();
    restorePreferenceProfile();
    bindNavigation();
    bindPlanner();
    bindOneClickPlan();
    bindCommunity();
    bindTripStory();
    bindResults();
    startHeroDestinationRotation();
    renderCommunityTrips();
    renderSavedTrips();
    applyPlannerCopy(document.documentElement.lang === "he" ? "he" : "en");
    showView("discover", false);
    refreshIcons();
  }

  function setDefaultDates() {
    const date = new Date();
    date.setDate(date.getDate() + 60);
    const value = date.toISOString().slice(0, 10);
    byId("quickStartDate").value = value;
    byId("plannerStartDate").value = value;
  }

  function bindNavigation() {
    document.querySelectorAll("[data-planner-view]").forEach((button) => {
      button.addEventListener("click", () => showView(button.dataset.plannerView));
    });

    window.addEventListener("co-travel-languagechange", (event) => {
      applyPlannerCopy(event.detail?.language === "he" ? "he" : "en");
      if (state.routeMode === "multi") renderRouteStops();
      if (state.currentTrip && state.view === "result") renderTripResult();
      if (state.storyTrip && state.view === "story") renderTripStory();
      if (state.pendingReservation) {
        byId("oneClickStatus").textContent = state.pendingReservation.destinations.length > 1 ? t("oneClickMultiReady") : t("oneClickReady");
        renderOneClickReview(state.pendingReservation);
      }
      renderSavedTrips();
    });
  }

  function showView(view, scroll = true) {
    state.view = view;
    const toolsMode = view === "tools";
    plannerApp.classList.toggle("hidden", toolsMode);
    legacyTools.classList.toggle("hidden", !toolsMode);

    document.querySelectorAll(".planner-view").forEach((section) => {
      section.classList.toggle("hidden", section.dataset.view !== view);
    });

    document.querySelectorAll(".product-nav-link").forEach((button) => {
      const activeView = view === "result" ? "planner" : view === "story" ? "discover" : view;
      button.classList.toggle("active", button.dataset.plannerView === activeView);
    });

    if (toolsMode) window.CoTravelLegacy?.showHome?.();
    if (view === "saved") renderSavedTrips();
    if (view === "planner") showPlannerStep(state.step || 1);
    if (scroll) window.scrollTo({ top: 0, behavior: "smooth" });
    refreshIcons();
  }

  function bindPlanner() {
    bindRouteBuilder();

    quickPlanForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const destination = byId("quickDestination").value.trim();
      const startDate = byId("quickStartDate").value;
      const duration = Number(byId("quickDuration").value);
      if (!destination || !startDate || !Number.isInteger(duration) || duration < 1) {
        showError(byId("quickPlanError"), t("quickError"));
        return;
      }
      hideError(byId("quickPlanError"));
      byId("plannerDestination").value = destination;
      byId("plannerStartDate").value = startDate;
      byId("plannerDuration").value = String(duration);
      setRouteMode("single", { seedFromDestination: false });
      state.sourcePlanId = null;
      state.step = 1;
      showView("planner");
    });

    document.querySelectorAll(".concept-question button").forEach((button) => {
      button.addEventListener("click", () => {
        const group = button.closest(".concept-question");
        group.querySelectorAll("button").forEach((peer) => peer.setAttribute("aria-pressed", String(peer === button)));
        state.preferences[group.dataset.question] = button.dataset.value;
      });
    });

    byId("plannerNextBtn").addEventListener("click", () => {
      if (state.step === 1 && !validateBasics()) return;
      state.step = Math.min(3, state.step + 1);
      showPlannerStep(state.step);
    });

    byId("plannerBackBtn").addEventListener("click", () => {
      state.step = Math.max(1, state.step - 1);
      showPlannerStep(state.step);
    });

    tripPlannerForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!validateBasics()) return;
      state.currentTrip = createTripFromForm();
      state.option = "balanced";
      if (byId("savePreferenceProfile").checked) savePreferenceProfile();
      renderTripResult();
      showView("result");
    });
  }

  function bindRouteBuilder() {
    document.querySelectorAll("button[data-route-mode]").forEach((button) => {
      button.addEventListener("click", () => setRouteMode(button.dataset.routeMode));
    });

    byId("addCityButton").addEventListener("click", () => {
      if (state.routeStops.length >= 5) return;
      state.routeStops.push(createRouteStop("", 2));
      renderRouteStops();
    });

    byId("multiCityStops").addEventListener("input", (event) => {
      const row = event.target.closest("[data-route-stop-id]");
      if (!row) return;
      const stop = state.routeStops.find((candidate) => candidate.id === row.dataset.routeStopId);
      if (!stop) return;
      if (event.target.matches("[data-route-city]")) {
        stop.city = event.target.value;
      }
      if (event.target.matches("[data-route-nights]")) stop.nights = clampRouteNights(event.target.value);
      updateRouteTotal();
    });

    byId("multiCityStops").addEventListener("change", (event) => {
      if (event.target.matches("[data-route-nights]")) renderRouteStops();
    });

    byId("multiCityStops").addEventListener("click", (event) => {
      const action = event.target.closest("button[data-route-action]");
      if (!action) return;
      const index = state.routeStops.findIndex((stop) => stop.id === action.dataset.routeStopId);
      if (index < 0) return;
      if (action.dataset.routeAction === "remove" && state.routeStops.length > 2) state.routeStops.splice(index, 1);
      if (action.dataset.routeAction === "up" && index > 0) [state.routeStops[index - 1], state.routeStops[index]] = [state.routeStops[index], state.routeStops[index - 1]];
      if (action.dataset.routeAction === "down" && index < state.routeStops.length - 1) [state.routeStops[index + 1], state.routeStops[index]] = [state.routeStops[index], state.routeStops[index + 1]];
      renderRouteStops();
    });

    setRouteMode("single", { seedFromDestination: false });
  }

  function setRouteMode(mode, options = {}) {
    const nextMode = mode === "multi" ? "multi" : "single";
    const wasMulti = state.routeMode === "multi";
    if (nextMode === "multi" && !wasMulti && options.seedFromDestination !== false) {
      const primaryCity = byId("plannerDestination").value.trim();
      const currentTotal = Number(byId("plannerDuration").value) || 5;
      const currentFirstCity = state.routeStops[0]?.city?.trim() || "";
      if (!state.routeStops.length || (primaryCity && normalizeCity(currentFirstCity) !== normalizeCity(primaryCity))) {
        const nights = distributeRouteNights(currentTotal, 2);
        state.routeStops = [createRouteStop(primaryCity, nights[0]), createRouteStop("", nights[1])];
      }
    }
    if (nextMode === "single" && wasMulti && options.seedFromDestination !== false) {
      const firstCity = state.routeStops.find((stop) => stop.city.trim())?.city || "";
      if (firstCity) byId("plannerDestination").value = firstCity;
    }

    state.routeMode = nextMode;
    document.querySelectorAll("button[data-route-mode]").forEach((button) => {
      const active = button.dataset.routeMode === nextMode;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    byId("plannerDestinationField").classList.toggle("hidden", nextMode === "multi");
    byId("plannerDurationField").classList.toggle("hidden", nextMode === "multi");
    byId("multiCityBuilder").classList.toggle("hidden", nextMode !== "multi");
    byId("plannerDestination").required = nextMode === "single";
    if (nextMode === "multi") renderRouteStops();
    refreshIcons();
  }

  function renderRouteStops() {
    if (state.routeStops.length < 2) {
      while (state.routeStops.length < 2) state.routeStops.push(createRouteStop("", 2));
    }
    byId("multiCityStops").innerHTML = state.routeStops.map((stop, index) => `
      <div class="route-stop" data-route-stop-id="${escapeHtml(stop.id)}">
        <span class="route-stop-order">${index + 1}</span>
        <label class="route-city-field"><span>${escapeHtml(t("city"))} ${index + 1}</span><input type="text" list="destinationSuggestions" value="${escapeHtml(stop.city)}" placeholder="${document.documentElement.lang === "he" ? "אתונה" : "Athens"}" data-route-city></label>
        <label class="route-nights-field"><span>${escapeHtml(t("cityNights"))}</span><input type="number" min="1" max="10" inputmode="numeric" value="${clampRouteNights(stop.nights)}" data-route-nights></label>
        <div class="route-stop-actions">
          <button type="button" data-route-action="up" data-route-stop-id="${escapeHtml(stop.id)}" aria-label="${escapeHtml(t("moveCityUp"))}" ${index === 0 ? "disabled" : ""}><i data-lucide="arrow-up" aria-hidden="true"></i></button>
          <button type="button" data-route-action="down" data-route-stop-id="${escapeHtml(stop.id)}" aria-label="${escapeHtml(t("moveCityDown"))}" ${index === state.routeStops.length - 1 ? "disabled" : ""}><i data-lucide="arrow-down" aria-hidden="true"></i></button>
          <button type="button" data-route-action="remove" data-route-stop-id="${escapeHtml(stop.id)}" aria-label="${escapeHtml(t("removeCity"))}" ${state.routeStops.length <= 2 ? "disabled" : ""}><i data-lucide="x" aria-hidden="true"></i></button>
        </div>
      </div>
    `).join("");
    byId("addCityButton").disabled = state.routeStops.length >= 5;
    updateRouteTotal();
    refreshIcons();
  }

  function updateRouteTotal() {
    const total = state.routeStops.reduce((sum, stop) => sum + clampRouteNights(stop.nights), 0);
    byId("multiCityTotal").textContent = document.documentElement.lang === "he" ? `${total} לילות` : `${total} night${total === 1 ? "" : "s"}`;
  }

  function createRouteStop(city, nights) {
    routeStopSequence += 1;
    return { id: `route-stop-${routeStopSequence}`, city: String(city || ""), nights: clampRouteNights(nights) };
  }

  function clampRouteNights(value) {
    return Math.max(1, Math.min(10, Number(value) || 1));
  }

  function distributeRouteNights(totalNights, cityCount) {
    const total = Math.max(cityCount, Number(totalNights) || cityCount * 2);
    const base = Math.floor(total / cityCount);
    const remainder = total % cityCount;
    return Array.from({ length: cityCount }, (_, index) => base + (index < remainder ? 1 : 0));
  }

  function bindOneClickPlan() {
    const fileInput = byId("oneClickFile");
    const uploadLabel = fileInput.closest(".one-click-upload");
    const review = byId("oneClickReview");
    fileInput.addEventListener("change", async () => {
      const file = fileInput.files?.[0];
      if (file) await handleOneClickFile(file);
    });

    ["dragenter", "dragover"].forEach((eventName) => {
      uploadLabel.addEventListener(eventName, (event) => {
        event.preventDefault();
        uploadLabel.classList.add("drag-over");
      });
    });

    ["dragleave", "drop"].forEach((eventName) => {
      uploadLabel.addEventListener(eventName, async (event) => {
        event.preventDefault();
        uploadLabel.classList.remove("drag-over");
        if (eventName !== "drop") return;
        const file = event.dataTransfer?.files?.[0];
        if (file) await handleOneClickFile(file);
      });
    });

    review.addEventListener("click", (event) => {
      const action = event.target.closest("button[data-reservation-action]");
      if (!action || !state.pendingReservation) return;
      state.sourcePlanId = null;
      state.step = action.dataset.reservationAction === "confirm" ? 2 : 1;
      showView("planner");
    });
  }

  async function handleOneClickFile(file) {
    const status = byId("oneClickStatus");
    const review = byId("oneClickReview");
    status.classList.remove("hidden", "error");
    review.classList.add("hidden");
    state.pendingReservation = null;
    status.textContent = `${t("oneClickReading")} ${file.name}`;
    try {
      const parsedTrip = await window.CoTravelLegacy?.extractTripFromFile?.(file);
      const details = prefillPlannerFromReservation(parsedTrip);
      if (!details.destination) {
        status.textContent = t("oneClickIncomplete");
        status.classList.add("error");
        return;
      }
      const readyMessage = details.destinations.length > 1 ? t("oneClickMultiReady") : t("oneClickReady");
      status.textContent = readyMessage;
      state.pendingReservation = details;
      renderOneClickReview(details);
    } catch {
      status.textContent = t("oneClickFailed");
      status.classList.add("error");
    } finally {
      byId("oneClickFile").value = "";
      refreshIcons();
    }
  }

  function renderOneClickReview(details) {
    const review = byId("oneClickReview");
    if (!review || !details) return;
    const route = details.destinations?.length
      ? details.destinations.map((city) => localizedDestinationName(city)).join(" → ")
      : localizedDestinationName(details.destination);
    const date = details.startDate ? formatDate(details.startDate, document.documentElement.lang) : t("notDetected");
    const nights = details.nights ? `${details.nights} ${t("nights")}` : t("notDetected");
    const travelers = details.passengerNames?.length ? details.passengerNames.join(", ") : t("notDetected");
    const fact = (icon, label, value) => `
      <div class="one-click-review-fact">
        <i data-lucide="${icon}" aria-hidden="true"></i>
        <span>${escapeHtml(label)}</span>
        <strong>${escapeHtml(value || t("notDetected"))}</strong>
      </div>`;

    review.innerHTML = `
      <div class="one-click-review-head">
        <div>
          <span class="eyebrow">${escapeHtml(t("detectedTrip"))}</span>
          <h3>${escapeHtml(t("confirmDetectedTrip"))}</h3>
          <p>${escapeHtml(t("detectedTripHelp"))}</p>
        </div>
        <span class="one-click-review-check" aria-hidden="true"><i data-lucide="badge-check"></i></span>
      </div>
      <div class="one-click-review-grid">
        ${fact("route", t("route"), route)}
        ${fact("plane-takeoff", t("departure"), details.origin)}
        ${fact("calendar-days", t("dates"), date)}
        ${fact("moon", t("duration"), nights)}
        ${fact("users", t("travelers"), travelers)}
      </div>
      <div class="one-click-review-actions">
        <button class="secondary" type="button" data-reservation-action="edit"><i data-lucide="pencil" aria-hidden="true"></i>${escapeHtml(t("editDetails"))}</button>
        <button class="primary" type="button" data-reservation-action="confirm">${escapeHtml(t("confirmDetails"))}<i data-lucide="arrow-right" aria-hidden="true"></i></button>
      </div>`;
    review.classList.remove("hidden");
    refreshIcons();
  }

  function prefillPlannerFromReservation(parsedTrip) {
    const segments = Array.isArray(parsedTrip?.segments) ? parsedTrip.segments : [];
    const firstSegment = segments[0] || {};
    const finalSegment = segments[segments.length - 1] || firstSegment;
    const routeCities = extractReservationRouteCities(segments);
    const fallbackDestination = firstSegment.arrival_city || firstSegment.arrival_country_name || firstSegment.arrival_airport || "";
    const cities = routeCities.length ? routeCities : [fallbackDestination].filter(Boolean);
    const displayCities = cities.map((city) => localizedDestinationName(city));
    const destination = displayCities.join(" → ");
    const origin = firstSegment.departure_city || firstSegment.departure_airport || "";
    const startDate = String(firstSegment.departure_datetime_local || "").slice(0, 10);
    const endDate = String(finalSegment.departure_datetime_local || finalSegment.arrival_datetime_local || "").slice(0, 10);
    const passengerNames = (parsedTrip?.passengers || []).map((passenger) => passenger.full_name).filter(Boolean);
    const nights = calculateReservationNights(startDate, endDate);

    byId("plannerOrigin").value = origin;
    if (startDate) byId("plannerStartDate").value = startDate;
    if (nights) byId("plannerDuration").value = String(nights);
    if (displayCities.length > 1) {
      const distributedNights = distributeRouteNights(nights, displayCities.length);
      state.routeStops = displayCities.map((city, index) => createRouteStop(city, distributedNights[index]));
      byId("plannerDestination").value = displayCities[0];
      setRouteMode("multi", { seedFromDestination: false });
    } else {
      byId("plannerDestination").value = displayCities[0] || "";
      setRouteMode("single", { seedFromDestination: false });
    }
    if (passengerNames.length) {
      byId("plannerCompanions").value = passengerNames.join(", ");
      byId("plannerGroup").value = passengerNames.length === 1 ? "solo" : "friends";
    }
    return { destination, destinations: displayCities, origin, startDate, nights, passengerNames };
  }

  function extractReservationRouteCities(segments) {
    if (!segments.length) return [];
    const origin = segmentCity(segments[0], "departure");
    const cities = [];
    const addCity = (city) => {
      const value = String(city || "").trim();
      if (!value || normalizeCity(value) === normalizeCity(origin)) return;
      if (cities.some((candidate) => normalizeCity(candidate) === normalizeCity(value))) return;
      cities.push(value);
    };

    segments.forEach((segment, index) => {
      const departureCity = segmentCity(segment, "departure");
      const previousArrival = index > 0 ? segmentCity(segments[index - 1], "arrival") : "";
      if (index > 0 && departureCity && normalizeCity(departureCity) !== normalizeCity(previousArrival)) addCity(departureCity);

      const arrivalCity = segmentCity(segment, "arrival");
      const nextSegment = segments[index + 1];
      const nextDeparture = nextSegment ? segmentCity(nextSegment, "departure") : "";
      const isShortConnection = nextSegment
        && normalizeCity(arrivalCity) === normalizeCity(nextDeparture)
        && hoursBetween(segment.arrival_datetime_local, nextSegment.departure_datetime_local) <= 12;
      if (!isShortConnection) addCity(arrivalCity);
    });
    return cities;
  }

  function segmentCity(segment, direction) {
    return segment?.[`${direction}_city`] || segment?.[`${direction}_country_name`] || segment?.[`${direction}_airport`] || "";
  }

  function hoursBetween(startValue, endValue) {
    const start = new Date(startValue || "");
    const end = new Date(endValue || "");
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return Number.POSITIVE_INFINITY;
    return Math.max(0, (end - start) / 3600000);
  }

  function calculateReservationNights(startDate, endDate) {
    if (!startDate || !endDate) return 5;
    const start = new Date(`${startDate}T12:00:00Z`);
    const end = new Date(`${endDate}T12:00:00Z`);
    const difference = Math.round((end - start) / 86400000);
    if (difference < 1 || difference > 14) return 5;
    return [3, 5, 7, 10, 14].reduce((closest, candidate) => Math.abs(candidate - difference) < Math.abs(closest - difference) ? candidate : closest, 5);
  }

  function showPlannerStep(step) {
    state.step = step;
    document.querySelectorAll(".planner-step").forEach((panel) => panel.classList.toggle("hidden", Number(panel.dataset.step) !== step));
    byId("plannerBackBtn").classList.toggle("hidden", step === 1);
    byId("plannerNextBtn").classList.toggle("hidden", step === 3);
    byId("generatePlansBtn").classList.toggle("hidden", step !== 3);
    byId("plannerProgressBar").style.width = `${(step / 3) * 100}%`;
    byId("plannerStepLabel").textContent = document.documentElement.lang === "he" ? `שלב ${step} מתוך 3` : `Step ${step} of 3`;
    hideError(byId("plannerError"));
    refreshIcons();
  }

  function validateBasics() {
    const destination = byId("plannerDestination").value.trim();
    const startDate = byId("plannerStartDate").value;
    const nights = Number(byId("plannerDuration").value);
    if (!startDate || (state.routeMode === "single" && (!Number.isInteger(nights) || nights < 1))) {
      showError(byId("plannerError"), t("plannerError"));
      return false;
    }
    if (state.routeMode === "multi") {
      const cities = state.routeStops.map((stop) => stop.city.trim()).filter(Boolean);
      const uniqueCities = new Set(cities.map(normalizeCity));
      const validNights = state.routeStops.every((stop) => clampRouteNights(stop.nights) >= 1);
      if (cities.length !== state.routeStops.length || uniqueCities.size < 2 || uniqueCities.size !== cities.length || !validNights) {
        showError(byId("plannerError"), t("multiCityError"));
        return false;
      }
    } else if (!destination) {
      showError(byId("plannerError"), t("plannerError"));
      return false;
    }
    hideError(byId("plannerError"));
    return true;
  }

  function bindCommunity() {
    document.querySelectorAll("[data-community-filter]").forEach((button) => {
      button.addEventListener("click", () => {
        state.filter = button.dataset.communityFilter;
        document.querySelectorAll("[data-community-filter]").forEach((peer) => peer.classList.toggle("active", peer === button));
        renderCommunityTrips();
      });
    });

    communityTripGrid.addEventListener("click", (event) => {
      const action = event.target.closest("button[data-community-action]");
      if (!action) return;
      const trip = findCommunityTrip(action.dataset.tripId);
      if (!trip) return;
      if (action.dataset.communityAction === "view") openTripStory(trip);
      if (action.dataset.communityAction === "use") seedPlannerFromCommunity(trip);
      if (action.dataset.communityAction === "save") saveCommunityIdea(trip);
    });

    savedTripsGrid.addEventListener("click", (event) => {
      const action = event.target.closest("button[data-saved-action]");
      if (!action) return;
      const trips = readTrips();
      const trip = trips.find((candidate) => candidate.id === action.dataset.tripId);
      if (!trip) return;
      if (action.dataset.savedAction === "open") {
        openTripStory(communityCardFromSavedTrip(trip));
      }
      if (action.dataset.savedAction === "customize") {
        loadTripIntoPlanner(trip);
      }
      if (action.dataset.savedAction === "delete" && window.confirm("Delete this locally saved trip?")) {
        writeTrips(trips.filter((candidate) => candidate.id !== trip.id));
        renderSavedTrips();
      }
    });
  }

  function bindTripStory() {
    tripStoryContent.addEventListener("click", (event) => {
      const action = event.target.closest("button[data-story-action]");
      if (!action || !state.storyTrip) return;
      const { card, trip } = state.storyTrip;
      if (action.dataset.storyAction === "back") showView(state.storyReturnView || "discover");
      if (action.dataset.storyAction === "save") {
        saveCommunityIdea(card);
        renderTripStory();
      }
      if (action.dataset.storyAction === "customize") seedPlannerFromCommunity(card);
      if (action.dataset.storyAction === "pdf") downloadTripPdf(trip, card);
      if (action.dataset.storyAction === "rate") {
        saveStoryRating(card, Number(action.dataset.rating));
        renderTripStory();
        showToast(t("ratingThanks"));
      }
    });
  }

  function bindResults() {
    tripResultContent.addEventListener("click", async (event) => {
      const travelReadinessButton = event.target.closest("button[data-travel-readiness-open]");
      if (travelReadinessButton) {
        openTravelReadiness(travelReadinessButton);
        return;
      }

      const deleteActivityButton = event.target.closest("button[data-delete-activity]");
      if (deleteActivityButton) {
        removeItineraryActivity(
          Number(deleteActivityButton.dataset.dayIndex),
          Number(deleteActivityButton.dataset.itemIndex)
        );
        return;
      }

      const moveActivityButton = event.target.closest("button[data-move-activity-day]");
      if (moveActivityButton) {
        moveActivityToAdjacentDay(
          Number(moveActivityButton.dataset.dayIndex),
          Number(moveActivityButton.dataset.itemIndex),
          Number(moveActivityButton.dataset.moveActivityDay)
        );
        return;
      }

      const itineraryDetail = event.target.closest("button[data-itinerary-detail]");
      if (itineraryDetail) {
        openItineraryItemDetails(Number(itineraryDetail.dataset.dayIndex), Number(itineraryDetail.dataset.itemIndex), itineraryDetail);
        return;
      }

      const recommendationPreview = event.target.closest("button[data-recommendation-preview]");
      if (recommendationPreview) {
        openRecommendationDetails(recommendationPreview.dataset.recommendationPreview, recommendationPreview.dataset.recommendationCity, recommendationPreview);
        return;
      }

      const recommendationCity = event.target.closest("button[data-recommendation-city-tab]");
      if (recommendationCity) {
        state.recommendationCity = recommendationCity.dataset.recommendationCityTab;
        state.recommendationFilter = "all";
        state.scanOffset = 0;
        renderTripResult();
        return;
      }

      const recommendationFilter = event.target.closest("button[data-recommendation-filter]");
      if (recommendationFilter) {
        state.recommendationFilter = recommendationFilter.dataset.recommendationFilter;
        state.scanOffset = 0;
        renderTripResult();
        return;
      }

      const recommendationButton = event.target.closest("button[data-add-recommendation]");
      if (recommendationButton) {
        addRecommendationToSelectedPlan(recommendationButton.dataset.addRecommendation, recommendationButton.dataset.recommendationCity);
        return;
      }

      const optionButton = event.target.closest("button[data-plan-option]");
      if (optionButton) {
        state.option = optionButton.dataset.planOption;
        state.currentTrip.selectedOption = state.option;
        renderTripResult();
        return;
      }

      const star = event.target.closest("button[data-rating]");
      if (star) {
        state.currentTrip.userRating = Number(star.dataset.rating);
        upsertTrip(state.currentTrip);
        renderTripResult();
        showToast(t("ratingSaved"));
        return;
      }

      const action = event.target.closest("button[data-result-action]");
      if (!action) return;
      if (action.dataset.resultAction === "edit") {
        loadTripIntoPlanner(state.currentTrip, 2);
      } else if (action.dataset.resultAction === "save") {
        upsertTrip(state.currentTrip);
        renderTripResult();
        showToast(t("tripSaved"));
      } else if (action.dataset.resultAction === "publish") {
        state.currentTrip.published = true;
        upsertTrip(state.currentTrip);
        renderTripResult();
        renderCommunityTrips();
        showToast(t("tripPublished"));
      } else if (action.dataset.resultAction === "customize") {
        loadTripIntoPlanner(state.currentTrip, 2);
      } else if (action.dataset.resultAction === "share") {
        await copyShareLink();
      } else if (action.dataset.resultAction === "requirements") {
        showView("tools");
        window.CoTravelLegacy?.showService?.("requirements");
      } else if (action.dataset.resultAction === "scan-destination") {
        const scanCity = state.recommendationCity || getTripStops(state.currentTrip)[0]?.city || state.currentTrip.destination;
        const cachedScan = destinationScanCache.get(normalizeCity(scanCity));
        if (cachedScan?.status === "ready" && cachedScan.items.length) {
          state.scanOffset += 6;
          renderTripResult();
          showToast(t("scanComplete"));
          return;
        }
        const activities = await ensureDestinationRecommendations(scanCity, { force: true });
        if (activities.length) showToast(t("scanComplete"));
      }
    });

    tripResultContent.addEventListener("pointerdown", (event) => {
      const handle = event.target.closest("button[data-itinerary-time-handle]");
      if (!handle) return;
      event.preventDefault();
      if (state.scheduleSliderTimer) window.clearTimeout(state.scheduleSliderTimer);
      state.scheduleSliderTimer = null;
      state.timeSliderDrag = {
        dayIndex: Number(handle.dataset.dayIndex),
        itemIndex: Number(handle.dataset.itemIndex),
        pointerId: event.pointerId,
        handle,
      };
      handle.setPointerCapture?.(event.pointerId);
      handle.classList.add("is-sliding");
      updateItineraryTimeFromPointer(event);
    });

    tripResultContent.addEventListener("pointermove", (event) => {
      if (!state.timeSliderDrag || state.timeSliderDrag.pointerId !== event.pointerId) return;
      updateItineraryTimeFromPointer(event);
    });

    ["pointerup", "pointercancel"].forEach((eventName) => {
      tripResultContent.addEventListener(eventName, (event) => {
        if (!state.timeSliderDrag || state.timeSliderDrag.pointerId !== event.pointerId) return;
        if (eventName === "pointerup") updateItineraryTimeFromPointer(event);
        const dayIndex = state.timeSliderDrag.dayIndex;
        state.timeSliderDrag.handle.classList.remove("is-sliding");
        state.timeSliderDrag = null;
        const day = getSelectedPlanOption()?.days?.[dayIndex];
        if (day) day.items.sort(compareItineraryTimes);
        commitScheduleChange();
      });
    });

    tripResultContent.addEventListener("keydown", (event) => {
      const handle = event.target.closest("button[data-itinerary-time-handle]");
      if (!handle || !["ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      const dayIndex = Number(handle.dataset.dayIndex);
      const itemIndex = Number(handle.dataset.itemIndex);
      const item = getSelectedItineraryItem(dayIndex, itemIndex);
      if (!item) return;
      const nextMinutes = event.key === "Home"
        ? itineraryDayStartMinutes
        : event.key === "End"
          ? itineraryDayEndMinutes
          : timeToMinutes(item.time) + (event.key === "ArrowUp" ? -30 : 30);
      updateItineraryTimeHandle(handle, dayIndex, itemIndex, nextMinutes);
      scheduleItinerarySliderCommit(dayIndex);
    });

    tripResultContent.addEventListener("dragstart", (event) => {
      const handle = event.target.closest("[data-activity-drag]");
      if (!handle) return;
      if (state.scheduleSliderTimer) window.clearTimeout(state.scheduleSliderTimer);
      state.scheduleSliderTimer = null;
      state.draggedActivity = {
        dayIndex: Number(handle.dataset.dayIndex),
        itemIndex: Number(handle.dataset.itemIndex),
      };
      if (event.dataTransfer) {
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/plain", `${state.draggedActivity.dayIndex}:${state.draggedActivity.itemIndex}`);
      }
      handle.closest(".timeline-item")?.classList.add("is-dragging");
    });

    tripResultContent.addEventListener("dragover", (event) => {
      const timeline = event.target.closest("[data-itinerary-day-drop]");
      if (!timeline || !state.draggedActivity) return;
      event.preventDefault();
      if (event.dataTransfer) event.dataTransfer.dropEffect = "move";
      clearScheduleDropIndicators();
      timeline.classList.add("is-drop-target");
      const targetItem = event.target.closest(".timeline-item[data-day-index]");
      if (targetItem) {
        const rect = targetItem.getBoundingClientRect();
        targetItem.classList.add(event.clientY > rect.top + rect.height / 2 ? "drop-after" : "drop-before");
      }
    });

    tripResultContent.addEventListener("drop", (event) => {
      const timeline = event.target.closest("[data-itinerary-day-drop]");
      if (!timeline || !state.draggedActivity) return;
      event.preventDefault();
      const targetItem = event.target.closest(".timeline-item[data-day-index]");
      let targetItemIndex = targetItem ? Number(targetItem.dataset.itemIndex) : getSelectedPlanOption()?.days?.[Number(timeline.dataset.itineraryDayDrop)]?.items?.length || 0;
      if (targetItem) {
        const rect = targetItem.getBoundingClientRect();
        if (event.clientY > rect.top + rect.height / 2) targetItemIndex += 1;
      }
      moveItineraryActivity(
        state.draggedActivity.dayIndex,
        state.draggedActivity.itemIndex,
        Number(timeline.dataset.itineraryDayDrop),
        targetItemIndex
      );
      state.draggedActivity = null;
      clearScheduleDropIndicators(true);
    });

    tripResultContent.addEventListener("dragend", () => {
      state.draggedActivity = null;
      clearScheduleDropIndicators(true);
    });

    itineraryDetailModal.addEventListener("click", (event) => {
      if (event.target.closest("[data-detail-close]")) closeItineraryDetails();
    });
    travelReadinessModal.addEventListener("click", (event) => {
      if (event.target.closest("[data-readiness-close]")) closeTravelReadiness();
      if (event.target.closest("[data-readiness-requirements]")) {
        openRequirementsInReadiness();
      }
      if (event.target.closest("[data-readiness-back]")) restoreReadinessOverview();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !itineraryDetailModal.classList.contains("hidden")) closeItineraryDetails();
      if (event.key === "Escape" && !travelReadinessModal.classList.contains("hidden")) closeTravelReadiness();
    });
  }

  function createTripFromForm() {
    const destinations = state.routeMode === "multi"
      ? state.routeStops.map((stop) => ({ city: stop.city.trim(), nights: clampRouteNights(stop.nights) }))
      : [{ city: byId("plannerDestination").value.trim(), nights: Number(byId("plannerDuration").value) }];
    const destination = destinations.map((stop) => stop.city).join(" → ");
    const totalNights = destinations.reduce((sum, stop) => sum + stop.nights, 0);
    const interests = [...document.querySelectorAll(".interest-picker input:checked")].map((input) => input.value);
    const profile = {
      pace: state.preferences.pace,
      structure: state.preferences.structure,
      crowds: state.preferences.crowds,
      interests,
      mobility: byId("plannerMobility").value,
      dietary: byId("plannerDietary").value.trim(),
      constraints: byId("plannerConstraints").value.trim(),
    };
    const template = findReusableTemplate(destinations[0].city, interests, state.sourcePlanId);
    const trip = {
      id: `trip-${Date.now()}`,
      destination,
      primaryDestination: destinations[0].city,
      destinations,
      origin: byId("plannerOrigin").value.trim(),
      startDate: byId("plannerStartDate").value,
      nights: totalNights,
      group: byId("plannerGroup").value,
      budget: byId("plannerBudget").value,
      companions: byId("plannerCompanions").value.trim(),
      profile,
      sourcePlanId: template?.id || null,
      createdAt: new Date().toISOString(),
      selectedOption: "balanced",
      published: false,
    };
    trip.options = buildPlanOptions(trip);
    state.recommendationFilter = "all";
    state.recommendationCity = destinations[0].city;
    state.scanOffset = 0;
    return trip;
  }

  function buildPlanOptions(trip) {
    const info = getDestinationInfo(getTripStops(trip)[0]?.city || trip.destination);
    return {
      balanced: buildOption(trip, info, "balanced", "Balanced", 92),
      immersive: buildOption(trip, info, "immersive", "Culture & flavor", 87),
      relaxed: buildOption(trip, info, "relaxed", "Easy pace", 84),
    };
  }

  function buildOption(trip, info, type, label, baseScore) {
    const routeStops = getTripStops(trip);
    const isMultiCity = routeStops.length > 1;
    const routeLabel = routeStops.map((stop) => stop.city).join(" + ");
    const paceAdjustment = (type === "relaxed" && trip.profile.pace === "slow") || (type === "immersive" && trip.profile.pace === "active") ? 4 : 0;
    const score = Math.min(97, baseScore + paceAdjustment + Math.min(2, trip.profile.interests.length));
    const titleMap = {
      balanced: isMultiCity ? `${routeLabel}, balanced your way` : `${info.name} essentials, your way`,
      immersive: isMultiCity ? `A deeper route through ${routeLabel}` : `A deeper taste of ${info.name}`,
      relaxed: isMultiCity ? `${routeLabel} at an easy pace` : `${info.name} at an easy pace`,
    };
    const summaryMap = {
      balanced: "A considered mix of essential places, local food, and unplanned breathing room.",
      immersive: "More culture, neighborhood detail, and experience-led stops for travelers who want depth.",
      relaxed: "Later starts, fewer transitions, and calmer days with space to change plans.",
    };
    return {
      type,
      label,
      title: titleMap[type],
      summary: summaryMap[type],
      score,
      days: buildDays(trip, info, type),
    };
  }

  function buildDays(trip, info, type) {
    const routeStops = getTripStops(trip);
    const isMultiCity = routeStops.length > 1;
    const singleCityDayCount = Math.max(2, Math.min(trip.nights, 7));
    const dayPlan = [];
    routeStops.forEach((stop, cityIndex) => {
      const cityDays = isMultiCity ? clampRouteNights(stop.nights) : singleCityDayCount;
      Array.from({ length: cityDays }, (_, localIndex) => dayPlan.push({ stop, cityIndex, localIndex }));
    });
    const startTimes = type === "relaxed" || trip.profile.pace === "slow" ? ["10:30", "14:30", "19:30"] : type === "immersive" || trip.profile.pace === "active" ? ["08:30", "13:00", "18:30"] : ["09:30", "14:00", "19:00"];
    const themes = type === "immersive"
      ? ["Stories and landmarks", "Markets and makers", "Neighborhood culture", "A signature local day", "Food and evening atmosphere", "Choose-your-own discovery", "A memorable finish"]
      : type === "relaxed"
        ? ["Arrive gently", "One neighborhood, well explored", "A spacious local day", "Nature and reset", "Easy favorites", "A flexible day", "Slow final morning"]
        : ["A welcoming first look", "Essential highlights", "Local flavor", "A change of scenery", "Neighborhood discoveries", "Your interests day", "A relaxed finish"];
    const interest = trip.profile.interests[0] || "culture";
    const secondInterest = trip.profile.interests[1] || "food";
    const interestLabels = {
      food: "Local food discovery",
      culture: "Culture and local stories",
      architecture: "Architecture walk",
      nature: "Green space and viewpoints",
      nightlife: "Live evening atmosphere",
      shopping: "Independent shops and makers",
      wellness: "Restorative break",
      family: "Easy group activity",
      event: "Shows and live events",
    };
    const details = {
      food: "Flexible tasting stops selected around dietary needs",
      culture: "A focused visit with time to absorb the place",
      architecture: "A walk linking distinctive buildings and streets",
      nature: "Outdoor time with a comfortable route",
      nightlife: "A well-rated area to check closer to the date",
      shopping: "Local designers, crafts, and small businesses",
      wellness: "Protected downtime without another transfer",
      family: "An accessible activity with shared appeal",
      event: "Theatre, music, and events matched to the destination",
    };

    return dayPlan.map(({ stop, cityIndex, localIndex }, index) => {
      const cityInfo = getDestinationInfo(stop.city);
      const highlight = cityInfo.highlights[localIndex % cityInfo.highlights.length];
      const chosenInterest = index % 2 === 0 ? interest : secondInterest;
      const evening = type === "relaxed" ? "Open evening near your base" : index % 2 === 0 ? "Neighborhood dinner" : "Sunset or local evening experience";
      const isTransferDay = isMultiCity && cityIndex > 0 && localIndex === 0;
      const items = isTransferDay
        ? [
          { time: "09:00", title: `Travel to ${stop.city}`, detail: "Protect time for the inter-city transfer and hotel check-in", category: "transport" },
          { time: startTimes[1], title: highlight, detail: "A comfortable first look near your new base", category: "place" },
          { time: startTimes[2], title: evening, detail: "Keep the first evening flexible after the transfer", category: evening.includes("dinner") ? "food" : "event" },
        ]
        : [
          { time: startTimes[0], title: highlight, detail: index === 0 ? "Orientation at a comfortable pace" : "Clustered with nearby stops to reduce travel time", category: "place" },
          { time: startTimes[1], title: interestLabels[chosenInterest] || interestLabels.culture, detail: details[chosenInterest] || details.culture, category: chosenInterest },
          { time: startTimes[2], title: evening, detail: type === "immersive" ? "Reserve ahead when the date is confirmed" : "Keep flexible until plans and energy are clear", category: evening.includes("dinner") ? "food" : "event" },
        ];
      return {
        day: index + 1,
        city: stop.city,
        theme: isMultiCity && isTransferDay ? "Arrival and orientation" : themes[index % themes.length],
        items,
      };
    });
  }

  function renderTimelineTitle(item, day, dayIndex, itemIndex, fallbackCity) {
    const city = item.recommendationCity || day.city || fallbackCity;
    const addedLabel = item.recommendationId ? `<span class="added-activity-label">${escapeHtml(t("addedToTrip"))}</span>` : "";
    if (isRestaurantSuggestion(item)) {
      const nearbySight = resolveNearbySight(item, day, itemIndex, city);
      const restaurantUrl = googleMapsRestaurantUrl(city, nearbySight.area, nearbySight.title);
      return `<strong class="timeline-title"><a class="timeline-title-control restaurant-link" href="${escapeHtml(restaurantUrl)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(`${item.title}. ${t("restaurantResults")}`)}">${escapeHtml(item.title)}<i data-lucide="external-link" aria-hidden="true"></i></a>${addedLabel}</strong>`;
    }
    if (item.source) {
      const sourceLabel = recommendationSourceLabel(item);
      return `<strong class="timeline-title"><a class="timeline-title-control official-activity-link" href="${escapeHtml(item.source)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(`${item.title}. ${sourceLabel}`)}">${escapeHtml(item.title)}<i data-lucide="external-link" aria-hidden="true"></i></a>${addedLabel}</strong>`;
    }
    return `<strong class="timeline-title"><button class="timeline-title-control" type="button" data-itinerary-detail data-day-index="${dayIndex}" data-item-index="${itemIndex}" aria-label="${escapeHtml(`${item.title}. ${t("moreInfo")}`)}">${escapeHtml(item.title)}<i data-lucide="info" aria-hidden="true"></i></button>${addedLabel}</strong>`;
  }

  function renderItineraryItem(item, day, dayIndex, itemIndex, fallbackCity) {
    const recommendationAttributes = item.recommendationId
      ? ` data-recommendation-id="${escapeHtml(item.recommendationId)}" data-recommendation-city="${escapeHtml(item.recommendationCity || day.city || fallbackCity)}" tabindex="-1"`
      : "";
    return `
      <div class="timeline-item ${item.recommendationId ? "added-activity" : ""}" data-day-index="${dayIndex}" data-item-index="${itemIndex}"${recommendationAttributes}>
        ${renderItineraryTimeControl(item, dayIndex, itemIndex)}
        <span class="timeline-item-content">${renderTimelineTitle(item, day, dayIndex, itemIndex, fallbackCity)}<small>${escapeHtml(item.detail)}</small></span>
        ${renderItineraryMoveActions(item, dayIndex, itemIndex)}
      </div>`;
  }

  function isRestaurantSuggestion(item = {}) {
    return item.category === "food" || /restaurant|dinner|lunch|food|tasting|cafe|café|taverna/i.test(item.title || "");
  }

  function resolveNearbySight(item, day, itemIndex, city) {
    const directMatch = resolveItinerarySource(item, city);
    if (item.area || directMatch?.area) {
      return { area: item.area || directMatch.area, title: "" };
    }

    const dayItems = Array.isArray(day?.items) ? day.items : [];
    for (let distance = 1; distance < dayItems.length; distance += 1) {
      for (const candidateIndex of [itemIndex - distance, itemIndex + distance]) {
        const candidate = dayItems[candidateIndex];
        if (!candidate || candidate.category === "transport" || isRestaurantSuggestion(candidate)) continue;
        const match = resolveItinerarySource(candidate, city);
        if (match?.area) return { area: match.area, title: candidate.title || match.title || "" };
      }
    }
    return { area: "", title: "" };
  }

  function googleMapsRestaurantUrl(city, area, nearbySightTitle = "") {
    const location = [nearbySightTitle || area, city]
      .map((value) => String(value || "").trim())
      .filter(Boolean)
      .join(", ");
    return googleMapsSearchUrl(`${nearbySightTitle ? "restaurants near" : "restaurants in"} ${location}`);
  }

  function googleMapsSearchUrl(query) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  }

  function getSelectedPlanOption() {
    const trip = state.currentTrip;
    if (!trip?.options) return null;
    return trip.options[state.option] || trip.options.balanced || null;
  }

  function getSelectedItineraryItem(dayIndex, itemIndex) {
    return getSelectedPlanOption()?.days?.[dayIndex]?.items?.[itemIndex] || null;
  }

  function timeToMinutes(value) {
    const match = String(value || "").match(/^(\d{1,2}):(\d{2})$/);
    if (!match) return 9 * 60;
    return Math.max(itineraryDayStartMinutes, Math.min(itineraryDayEndMinutes, Number(match[1]) * 60 + Number(match[2])));
  }

  function minutesToTime(value) {
    const minutes = Math.max(itineraryDayStartMinutes, Math.min(itineraryDayEndMinutes, Number(value) || itineraryDayStartMinutes));
    return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
  }

  function compareItineraryTimes(left, right) {
    return timeToMinutes(left.time) - timeToMinutes(right.time);
  }

  function renderItineraryTimeControl(item, dayIndex, itemIndex) {
    const value = timeToMinutes(item.time);
    const label = t("activityTime").replace("{activity}", item.title);
    return `
      <div class="timeline-time-control">
        <output>${escapeHtml(minutesToTime(value))}</output>
        <button class="timeline-time-handle" type="button" role="slider" data-itinerary-time-handle data-day-index="${dayIndex}" data-item-index="${itemIndex}" aria-label="${escapeHtml(label)}" aria-valuemin="${itineraryDayStartMinutes}" aria-valuemax="${itineraryDayEndMinutes}" aria-valuenow="${value}" aria-valuetext="${escapeHtml(minutesToTime(value))}"><span aria-hidden="true"></span></button>
      </div>`;
  }

  function updateItineraryTimeFromPointer(event) {
    const drag = state.timeSliderDrag;
    const timeline = drag?.handle?.closest("[data-itinerary-day-drop]");
    if (!drag || !timeline) return;
    const rect = timeline.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (event.clientY - rect.top) / Math.max(1, rect.height)));
    const rawMinutes = itineraryDayStartMinutes + ratio * (itineraryDayEndMinutes - itineraryDayStartMinutes);
    updateItineraryTimeHandle(drag.handle, drag.dayIndex, drag.itemIndex, Math.round(rawMinutes / 30) * 30);
  }

  function updateItineraryTimeHandle(handle, dayIndex, itemIndex, minutes) {
    const item = getSelectedItineraryItem(dayIndex, itemIndex);
    if (!item) return;
    item.time = minutesToTime(minutes);
    handle.setAttribute("aria-valuenow", String(timeToMinutes(item.time)));
    handle.setAttribute("aria-valuetext", item.time);
    handle.closest(".timeline-time-control")?.querySelector("output")?.replaceChildren(item.time);
  }

  function renderItineraryMoveActions(item, dayIndex, itemIndex) {
    const dragLabel = t("dragActivity").replace("{activity}", item.title);
    const deleteLabel = `${t("deleteActivity")}: ${item.title}`;
    return `
      <div class="timeline-move-actions">
        <button type="button" data-move-activity-day="-1" data-day-index="${dayIndex}" data-item-index="${itemIndex}" aria-label="${escapeHtml(`${t("previousDay")}: ${item.title}`)}" title="${escapeHtml(t("previousDay"))}" ${dayIndex === 0 ? "disabled" : ""}><i data-lucide="chevron-up" aria-hidden="true"></i></button>
        <button class="timeline-drag-handle" type="button" draggable="true" data-activity-drag data-day-index="${dayIndex}" data-item-index="${itemIndex}" aria-label="${escapeHtml(dragLabel)}" title="${escapeHtml(dragLabel)}"><i data-lucide="grip-vertical" aria-hidden="true"></i></button>
        <button class="timeline-delete-activity" type="button" data-delete-activity data-day-index="${dayIndex}" data-item-index="${itemIndex}" aria-label="${escapeHtml(deleteLabel)}" title="${escapeHtml(t("deleteActivity"))}"><i data-lucide="trash-2" aria-hidden="true"></i></button>
      </div>`;
  }

  function removeItineraryActivity(dayIndex, itemIndex) {
    const day = getSelectedPlanOption()?.days?.[dayIndex];
    if (!day?.items?.[itemIndex]) return;
    day.items.splice(itemIndex, 1);
    commitScheduleChange("activityRemoved");
  }

  function moveActivityToAdjacentDay(dayIndex, itemIndex, direction) {
    const option = getSelectedPlanOption();
    const targetDayIndex = dayIndex + direction;
    const sourceDay = option?.days?.[dayIndex];
    const targetDay = option?.days?.[targetDayIndex];
    if (!sourceDay || !targetDay || !sourceDay.items[itemIndex]) return;
    const [item] = sourceDay.items.splice(itemIndex, 1);
    if (sourceDay.city && targetDay.city && normalizeCity(sourceDay.city) !== normalizeCity(targetDay.city)) {
      item.recommendationCity = item.recommendationCity || sourceDay.city;
    }
    item.time = findAvailableItineraryTime(targetDay.items, item.time);
    targetDay.items.push(item);
    targetDay.items.sort(compareItineraryTimes);
    commitScheduleChange();
  }

  function moveItineraryActivity(sourceDayIndex, sourceItemIndex, targetDayIndex, targetItemIndex) {
    const option = getSelectedPlanOption();
    const sourceDay = option?.days?.[sourceDayIndex];
    const targetDay = option?.days?.[targetDayIndex];
    if (!sourceDay || !targetDay || !sourceDay.items[sourceItemIndex]) return;
    const [item] = sourceDay.items.splice(sourceItemIndex, 1);
    if (sourceDay.city && targetDay.city && normalizeCity(sourceDay.city) !== normalizeCity(targetDay.city)) {
      item.recommendationCity = item.recommendationCity || sourceDay.city;
    }
    let insertionIndex = Number.isFinite(targetItemIndex) ? targetItemIndex : targetDay.items.length;
    if (sourceDay === targetDay && insertionIndex > sourceItemIndex) insertionIndex -= 1;
    insertionIndex = Math.max(0, Math.min(targetDay.items.length, insertionIndex));
    item.time = itineraryTimeForPosition(targetDay.items, insertionIndex, item.time);
    targetDay.items.splice(insertionIndex, 0, item);
    targetDay.items.sort(compareItineraryTimes);
    commitScheduleChange();
  }

  function itineraryTimeForPosition(items, index, fallback) {
    const previous = index > 0 ? timeToMinutes(items[index - 1]?.time) : null;
    const next = index < items.length ? timeToMinutes(items[index]?.time) : null;
    let candidate = timeToMinutes(fallback);
    if (previous != null && next != null) candidate = Math.round(((previous + next) / 2) / 30) * 30;
    else if (previous != null) candidate = previous + 60;
    else if (next != null) candidate = next - 60;
    return minutesToTime(candidate);
  }

  function findAvailableItineraryTime(items, preferredTime) {
    const occupied = new Set(items.map((item) => timeToMinutes(item.time)));
    const preferred = Math.round(timeToMinutes(preferredTime) / 30) * 30;
    if (!occupied.has(preferred)) return minutesToTime(preferred);
    for (let offset = 30; offset <= itineraryDayEndMinutes - itineraryDayStartMinutes; offset += 30) {
      const later = preferred + offset;
      if (later <= itineraryDayEndMinutes && !occupied.has(later)) return minutesToTime(later);
      const earlier = preferred - offset;
      if (earlier >= itineraryDayStartMinutes && !occupied.has(earlier)) return minutesToTime(earlier);
    }
    return minutesToTime(preferred);
  }

  function scheduleItinerarySliderCommit(dayIndex) {
    if (state.scheduleSliderTimer) window.clearTimeout(state.scheduleSliderTimer);
    const trip = state.currentTrip;
    const day = getSelectedPlanOption()?.days?.[dayIndex];
    state.scheduleSliderTimer = window.setTimeout(() => {
      if (state.currentTrip !== trip) {
        state.scheduleSliderTimer = null;
        return;
      }
      if (day) day.items.sort(compareItineraryTimes);
      state.scheduleSliderTimer = null;
      commitScheduleChange();
    }, 700);
  }

  function commitScheduleChange(messageKey = "scheduleUpdated") {
    const trip = state.currentTrip;
    if (!trip) return;
    if (state.scheduleSliderTimer) window.clearTimeout(state.scheduleSliderTimer);
    state.scheduleSliderTimer = null;
    trip.selectedOption = state.option;
    trip.updatedAt = new Date().toISOString();
    if (isTripSaved(trip.id)) upsertTrip(trip);
    renderTripResult();
    showToast(t(messageKey));
  }

  function clearScheduleDropIndicators(includeDragging = false) {
    const selector = includeDragging ? ".is-dragging, .is-drop-target, .drop-before, .drop-after" : ".is-drop-target, .drop-before, .drop-after";
    tripResultContent.querySelectorAll(selector).forEach((element) => {
      element.classList.remove("is-dragging", "is-drop-target", "drop-before", "drop-after");
    });
  }

  function renderTripResult() {
    const trip = state.currentTrip;
    if (!trip) return;
    if (!trip.options) trip.options = buildPlanOptions(trip);
    const routeStops = getTripStops(trip);
    const isMultiCity = routeStops.length > 1;
    const primaryCity = routeStops[0]?.city || trip.destination;
    const info = getDestinationInfo(primaryCity);
    if (!routeStops.some((stop) => normalizeCity(stop.city) === normalizeCity(state.recommendationCity))) state.recommendationCity = primaryCity;
    const activeRecommendationCity = state.recommendationCity || primaryCity;
    const recommendationInfo = getDestinationInfo(activeRecommendationCity);
    const recommendationScan = destinationScanCache.get(normalizeCity(activeRecommendationCity));
    const recommendationScanLoading = !recommendationScan || recommendationScan.status === "loading";
    const option = trip.options[state.option] || trip.options.balanced;
    const language = document.documentElement.lang === "he" ? "he" : "en";
    const destinationLabel = routeStops.map((stop) => localizedDestinationName(stop.city, language)).join(" → ") || localizedDestinationName(trip.destination, language);
    const date = formatDate(trip.startDate, language);
    const profileTags = buildProfileTags(trip.profile);
    const sourceNote = trip.sourcePlanId ? t("reusedTemplate") : t("originalPlan");
    const optionOrder = ["balanced", "immersive", "relaxed"];
    const selectedOptionLabel = option.type === "balanced" ? "Best fit" : option.type === "immersive" ? "Experience rich" : "Calmest pace";

    tripResultContent.innerHTML = `
      <header class="result-hero">
        <div class="result-hero-photo ${info.photo ? "is-ready" : ""}" data-city-photo-target="hero">${renderCityPhotoMarkup(info.photo)}</div>
        <button class="result-back" type="button" data-result-action="edit"><i data-lucide="arrow-left" aria-hidden="true"></i>${escapeHtml(t("editPreferences"))}</button>
        <h1>${escapeHtml(destinationLabel)}, shaped around how your group travels</h1>
        <div class="result-meta">
          <span><i data-lucide="calendar-days" aria-hidden="true"></i>${escapeHtml(date)} · ${trip.nights} nights</span>
          <span><i data-lucide="users" aria-hidden="true"></i>${escapeHtml(groupLabel(trip.group, trip.companions))}</span>
          <span><i data-lucide="wallet-cards" aria-hidden="true"></i>${escapeHtml(capitalize(trip.budget))} budget</span>
          ${isMultiCity ? `<span><i data-lucide="route" aria-hidden="true"></i>${routeStops.length} cities</span>` : ""}
        </div>
        ${isMultiCity ? `<div class="result-route">${routeStops.map((stop, index) => `${index ? '<i data-lucide="arrow-right" aria-hidden="true"></i>' : ""}<span class="result-route-stop">${escapeHtml(localizedDestinationName(stop.city, language))} · ${stop.nights} nights</span>`).join("")}</div>` : ""}
        <div class="preference-strip">
          <div><strong>${escapeHtml(t("groupProfile"))}</strong><small>${escapeHtml(t("generatedSignals"))}</small></div>
          <div class="preference-summary-tags">${profileTags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
          <button class="secondary" type="button" data-result-action="edit">${escapeHtml(t("editPreferences"))}</button>
        </div>
      </header>

      <div class="result-layout">
        <main>
          <div class="result-section-heading"><span class="eyebrow">${escapeHtml(t("resultEyebrow"))}</span><h2>${escapeHtml(t("resultHeading"))}</h2><p>${escapeHtml(t("resultHelper"))}</p></div>
          <div class="option-tabs" role="tablist" aria-label="Suggested trip plans">
            ${optionOrder.map((key, index) => `<button class="planner-option-tab" type="button" role="tab" aria-selected="${String(key === state.option)}" data-plan-option="${key}">${index + 1} · ${escapeHtml(trip.options[key].label)}</button>`).join("")}
          </div>
          <article class="plan-card">
            <div class="plan-card-head">
              <div><div class="plan-title-row"><h3>${escapeHtml(option.title)}</h3><span class="plan-badge">${escapeHtml(selectedOptionLabel)}</span></div><p>${escapeHtml(option.summary)}</p></div>
              <div class="match-score"><span class="score-ring">${option.score}</span><span><strong>${escapeHtml(t("preferenceFit"))}</strong><small>Based on answers</small></span></div>
            </div>
            <p class="reuse-note"><i data-lucide="git-fork" aria-hidden="true"></i><span>${escapeHtml(sourceNote)}</span></p>
            <div class="day-list">
              ${option.days.map((day, dayIndex) => `
                <section class="itinerary-day" data-itinerary-day-index="${dayIndex}">
                  <div class="day-heading"><strong>Day ${day.day}${isMultiCity ? `<em>${escapeHtml(localizedDestinationName(day.city, language))}</em>` : ""}</strong><span>${escapeHtml(day.theme)}</span></div>
                  <div class="timeline" data-itinerary-day-drop="${dayIndex}"><div class="timeline-day-scale" aria-hidden="true"><span>07:00</span><span>23:00</span></div>${day.items.map((item, itemIndex) => renderItineraryItem(item, day, dayIndex, itemIndex, primaryCity)).join("")}</div>
                </section>
              `).join("")}
            </div>
            <div class="plan-actions">
              <button class="secondary" type="button" data-result-action="share"><i data-lucide="share-2" aria-hidden="true"></i>${escapeHtml(t("share"))}</button>
              <button class="secondary" type="button" data-result-action="save"><i data-lucide="bookmark" aria-hidden="true"></i>${escapeHtml(isTripSaved(trip.id) ? t("saved") : t("saveTrip"))}</button>
              <button class="primary" type="button" data-result-action="customize"><i data-lucide="wand-sparkles" aria-hidden="true"></i>${escapeHtml(t("customize"))}</button>
            </div>
          </article>
        </main>

        <aside class="result-sidebar" aria-label="Trip essentials">
          <button class="trip-side-panel readiness-launch" type="button" data-travel-readiness-open aria-haspopup="dialog" aria-controls="travelReadinessModal">
            <span class="readiness-launch-icon"><i data-lucide="shield-check" aria-hidden="true"></i></span>
            <span class="readiness-launch-copy"><strong>${escapeHtml(t("travelReadiness"))}</strong><small>${escapeHtml(t("readinessOpenBody"))}</small></span>
            <i class="readiness-launch-arrow" data-lucide="chevron-right" aria-hidden="true"></i>
          </button>

          <section class="trip-side-panel">
            <div class="destination-panel-visual"><div class="destination-panel-photo ${info.photo ? "is-ready" : ""}" data-city-photo-target="panel">${renderCityPhotoMarkup(info.photo)}</div><span>${escapeHtml(info.country)}</span><strong>${escapeHtml(info.name)}</strong></div>
            <h3>${escapeHtml(isMultiCity ? t("routeSnapshot") : t("destinationSnapshot"))}</h3>
            ${isMultiCity ? `<div class="route-snapshot-list">${routeStops.map((stop, index) => `<div class="route-snapshot-stop"><span>${index + 1}</span><strong>${escapeHtml(localizedDestinationName(stop.city, language))}</strong><small>${stop.nights} nights</small></div>`).join("")}</div>` : ""}
            <div class="destination-weather" data-destination-weather>
              <span class="destination-weather-icon"><i data-lucide="cloud-sun" aria-hidden="true"></i></span>
              <span><strong data-weather-summary>${escapeHtml(t("weatherLoading"))}</strong><small>${escapeHtml(t("weather"))}</small></span>
              <em data-weather-temperature>—</em>
              <small data-weather-range></small>
            </div>
            <div class="destination-facts"><span><strong>${escapeHtml(info.currency)}</strong><small>${escapeHtml(t("currency"))}</small></span><span><strong>${escapeHtml(info.timeZone)}</strong><small>${escapeHtml(t("timeZone"))}</small></span><span><strong>${escapeHtml(info.character.split(" · ")[0])}</strong><small>${escapeHtml(t("character"))}</small></span></div>
          </section>

          <section class="trip-side-panel recommendation-panel">
            <div class="recommendation-panel-head">
              <div><h3>${escapeHtml(t("planningIdeas"))}</h3><p>${escapeHtml(t("planningIdeasBody"))}</p></div>
              <button class="secondary scan-destination-button" type="button" data-result-action="scan-destination" ${recommendationScanLoading ? "disabled" : ""}><i data-lucide="radar" aria-hidden="true"></i>${escapeHtml(t("scanDestination"))}</button>
            </div>
            ${isMultiCity ? `<div class="recommendation-city-tabs" role="tablist" aria-label="Choose a city for destination ideas">${routeStops.map((stop) => `<button class="recommendation-city-tab ${normalizeCity(stop.city) === normalizeCity(state.recommendationCity) ? "active" : ""}" type="button" role="tab" aria-selected="${String(normalizeCity(stop.city) === normalizeCity(state.recommendationCity))}" data-recommendation-city-tab="${escapeHtml(stop.city)}"><i data-lucide="map-pin" aria-hidden="true"></i>${escapeHtml(localizedDestinationName(stop.city, language))}</button>`).join("")}</div>` : ""}
            <div class="recommendation-filters" role="group" aria-label="Filter destination ideas">
              ${recommendationFilterButton("all", t("allIdeas"))}
              ${recommendationFilterButton("places", t("places"))}
              ${recommendationFilterButton("food", t("foodExperiences"))}
              ${recommendationFilterButton("event", t("eventsFilter"))}
            </div>
            <div class="recommendation-list">${renderRecommendationList(recommendationInfo, option, activeRecommendationCity, recommendationScan)}</div>
            ${recommendationScan?.status === "ready" && recommendationScan.items.length ? `<a class="recommendation-attribution" href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">${escapeHtml(t("osmAttribution"))}</a>` : ""}
            <p class="readiness-warning">${escapeHtml(t("planningIdeasNote"))}</p>
          </section>

          <section class="trip-side-panel">
            <h3>${escapeHtml(t("ratePlan"))}</h3>
            <div class="result-rating"><div class="star-rating" aria-label="Rate this plan from one to five">${[1, 2, 3, 4, 5].map((rating) => `<button class="star-button ${rating <= (trip.userRating || 0) ? "active" : ""}" type="button" data-rating="${rating}" aria-label="${rating} stars"><i data-lucide="star" aria-hidden="true"></i></button>`).join("")}</div><span>${trip.userRating ? `${trip.userRating}/5` : "Not rated"}</span></div>
          </section>

          <section class="trip-side-panel">
            <h3>${escapeHtml(t("browserOnly"))}</h3>
            <p class="readiness-warning">${escapeHtml(t("browserOnlyBody"))}</p>
            <button class="secondary" type="button" data-result-action="publish"><i data-lucide="globe-2" aria-hidden="true"></i>${escapeHtml(trip.published ? t("published") : t("publish"))}</button>
          </section>
        </aside>
      </div>
    `;
    refreshIcons();
    void hydrateDestinationSnapshot(primaryCity, info, trip);
    void ensureDestinationRecommendations(activeRecommendationCity);
  }

  function recommendationFilterButton(value, label) {
    return `<button class="recommendation-filter ${state.recommendationFilter === value ? "active" : ""}" type="button" aria-pressed="${String(state.recommendationFilter === value)}" data-recommendation-filter="${escapeHtml(value)}">${escapeHtml(label)}</button>`;
  }

  function renderCityPhotoMarkup(photo) {
    if (!photo?.src) return "";
    const sourceName = photo.sourceName || (String(photo.page || "").includes("unsplash.com") ? "Unsplash" : "Photo source");
    return `<img src="${escapeHtml(photo.src)}" alt="${escapeHtml(photo.alt || "Destination view")}"><a class="photo-credit" href="${escapeHtml(photo.page)}" target="_blank" rel="noopener noreferrer">Photo: ${escapeHtml(photo.credit || sourceName)} · ${escapeHtml(sourceName)}</a>`;
  }

  async function hydrateDestinationSnapshot(city, info, trip) {
    const [photo, weather] = await Promise.all([resolveCityPhoto(city, info), loadDestinationWeather(city)]);
    if (state.currentTrip !== trip || normalizeCity(getTripStops(trip)[0]?.city || trip.destination) !== normalizeCity(city)) return;

    if (photo) {
      tripResultContent.querySelectorAll("[data-city-photo-target]").forEach((target) => {
        target.innerHTML = renderCityPhotoMarkup(photo);
        target.classList.add("is-ready");
      });
    }
    renderDestinationWeather(weather);
    refreshIcons();
  }

  function resolveCityPhoto(city, info) {
    if (info?.photo) return Promise.resolve({ ...info.photo, sourceName: "Unsplash" });
    const cacheKey = normalizeCity(city);
    const override = cityPhotoOverrides[cacheKey];
    if (override) return Promise.resolve(override);
    if (cityPhotoCache.has(cacheKey)) return cityPhotoCache.get(cacheKey);
    const request = fetchCommonsCityPhoto(canonicalDestinationName(city)).catch(() => null);
    cityPhotoCache.set(cacheKey, request);
    return request;
  }

  async function fetchCommonsCityPhoto(city) {
    const params = new URLSearchParams({
      action: "query",
      generator: "search",
      gsrsearch: `${city} skyline cityscape`,
      gsrnamespace: "6",
      gsrlimit: "10",
      prop: "imageinfo|info",
      iiprop: "url|mime|size|extmetadata",
      iiurlwidth: "1600",
      inprop: "url",
      format: "json",
      origin: "*",
    });
    const response = await fetch(`https://commons.wikimedia.org/w/api.php?${params}`);
    if (!response.ok) throw new Error("City photo lookup failed");
    const payload = await response.json();
    const pages = Object.values(payload?.query?.pages || {});
    for (const page of pages) {
      const image = page.imageinfo?.[0];
      const license = plainTextFromHtml(image?.extmetadata?.LicenseShortName?.value);
      const allowedLicense = /^(CC BY|CC0|Public domain)/i.test(license);
      const usableImage = /^image\/(jpeg|png|webp)$/i.test(image?.mime || "") && Number(image?.width) >= Number(image?.height || 0);
      if (!image?.thumburl || !allowedLicense || !usableImage) continue;
      const artist = plainTextFromHtml(image.extmetadata?.Artist?.value) || "Wikimedia contributor";
      return {
        src: image.thumburl,
        page: page.fullurl || `https://commons.wikimedia.org/wiki/${encodeURIComponent(page.title || "")}`,
        credit: `${artist.slice(0, 70)} · ${license}`,
        sourceName: "Wikimedia Commons",
        alt: `${localizedDestinationName(city)} city view`,
      };
    }
    return null;
  }

  function plainTextFromHtml(value) {
    if (!value) return "";
    const container = document.createElement("div");
    container.innerHTML = String(value);
    return String(container.textContent || "").replace(/\s+/g, " ").trim();
  }

  function loadDestinationWeather(city) {
    const cacheKey = normalizeCity(city);
    if (weatherCache.has(cacheKey)) return weatherCache.get(cacheKey);
    const request = fetchDestinationWeather(canonicalDestinationName(city)).catch(() => null);
    weatherCache.set(cacheKey, request);
    return request;
  }

  async function fetchDestinationWeather(city) {
    const geocodingUrl = new URL("https://geocoding-api.open-meteo.com/v1/search");
    geocodingUrl.search = new URLSearchParams({ name: city, count: "1", language: "en", format: "json" });
    const locationResponse = await fetch(geocodingUrl);
    if (!locationResponse.ok) throw new Error("Weather location lookup failed");
    const location = (await locationResponse.json())?.results?.[0];
    if (!Number.isFinite(location?.latitude) || !Number.isFinite(location?.longitude)) return null;

    const forecastUrl = new URL("https://api.open-meteo.com/v1/forecast");
    forecastUrl.search = new URLSearchParams({
      latitude: String(location.latitude),
      longitude: String(location.longitude),
      current: "temperature_2m,weather_code",
      daily: "temperature_2m_max,temperature_2m_min,precipitation_probability_max",
      timezone: "auto",
      forecast_days: "1",
    });
    const weatherResponse = await fetch(forecastUrl);
    if (!weatherResponse.ok) throw new Error("Weather forecast failed");
    const weather = await weatherResponse.json();
    return {
      temperature: weather.current?.temperature_2m,
      code: weather.current?.weather_code,
      high: weather.daily?.temperature_2m_max?.[0],
      low: weather.daily?.temperature_2m_min?.[0],
      rainChance: weather.daily?.precipitation_probability_max?.[0],
    };
  }

  function renderDestinationWeather(weather) {
    const panel = tripResultContent.querySelector("[data-destination-weather]");
    if (!panel) return;
    const summary = panel.querySelector("[data-weather-summary]");
    const temperature = panel.querySelector("[data-weather-temperature]");
    const range = panel.querySelector("[data-weather-range]");
    const icon = panel.querySelector("[data-lucide]");
    if (!weather || !Number.isFinite(weather.temperature)) {
      summary.textContent = t("weatherUnavailable");
      temperature.textContent = "—";
      range.textContent = "";
      icon?.setAttribute("data-lucide", "cloud-off");
      return;
    }
    summary.textContent = weatherConditionLabel(weather.code);
    temperature.textContent = `${Math.round(weather.temperature)}°`;
    const high = Number.isFinite(weather.high) ? `${Math.round(weather.high)}°` : "—";
    const low = Number.isFinite(weather.low) ? `${Math.round(weather.low)}°` : "—";
    const rain = Number.isFinite(weather.rainChance) ? ` · ${Math.round(weather.rainChance)}% ${document.documentElement.lang === "he" ? "גשם" : "rain"}` : "";
    range.innerHTML = `${document.documentElement.lang === "he" ? "מקס׳" : "H"} ${high} · ${document.documentElement.lang === "he" ? "מינ׳" : "L"} ${low}${rain} · <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer">Open-Meteo</a>`;
    icon?.setAttribute("data-lucide", weatherConditionIcon(weather.code));
  }

  function weatherConditionLabel(code) {
    const language = document.documentElement.lang === "he" ? "he" : "en";
    const labels = {
      clear: { en: "Clear", he: "בהיר" },
      cloudy: { en: "Partly cloudy", he: "מעונן חלקית" },
      fog: { en: "Fog", he: "ערפל" },
      drizzle: { en: "Drizzle", he: "טפטוף" },
      rain: { en: "Rain", he: "גשם" },
      snow: { en: "Snow", he: "שלג" },
      showers: { en: "Showers", he: "ממטרים" },
      storm: { en: "Thunderstorms", he: "סופות רעמים" },
    };
    const category = code === 0 ? "clear"
      : [1, 2, 3].includes(code) ? "cloudy"
        : [45, 48].includes(code) ? "fog"
          : code >= 51 && code <= 57 ? "drizzle"
            : code >= 61 && code <= 67 ? "rain"
              : code >= 71 && code <= 77 ? "snow"
                : code >= 80 && code <= 86 ? "showers"
                  : code >= 95 ? "storm" : "cloudy";
    return labels[category][language];
  }

  function weatherConditionIcon(code) {
    if (code === 0) return "sun";
    if ([1, 2, 3].includes(code)) return "cloud-sun";
    if ([45, 48].includes(code)) return "cloud-fog";
    if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return "cloud-rain";
    if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) return "cloud-snow";
    if (code >= 95) return "cloud-lightning";
    return "cloud";
  }

  function getVisibleRecommendations(info) {
    const recommendations = Array.isArray(info.recommendations) ? info.recommendations : [];
    const filtered = recommendations.filter((recommendation) => {
      if (state.recommendationFilter === "all") return true;
      if (state.recommendationFilter === "places") return !["food", "event"].includes(recommendation.category);
      return recommendation.category === state.recommendationFilter;
    });
    if (!filtered.length) return [];
    const count = Math.min(6, filtered.length);
    const offset = state.scanOffset % filtered.length;
    return Array.from({ length: count }, (_, index) => filtered[(offset + index) % filtered.length]);
  }

  function renderRecommendationList(info, option, city, scanRecord) {
    const recommendations = getVisibleRecommendations(info);
    if (recommendations.length) return recommendations.map((recommendation) => renderRecommendationItem(recommendation, option, city)).join("");
    const message = scanRecord?.status === "error"
      ? t("scanFailed")
      : scanRecord?.status === "ready"
        ? t("scanEmpty")
        : t("scanLoading");
    const icon = scanRecord?.status === "error" ? "wifi-off" : scanRecord?.status === "ready" ? "search-x" : "loader-circle";
    return `<div class="recommendation-scan-state ${scanRecord?.status === "loading" || !scanRecord ? "is-loading" : ""}" role="status"><i data-lucide="${icon}" aria-hidden="true"></i><span>${escapeHtml(message)}</span></div>`;
  }

  function renderRecommendationItem(recommendation, option, city) {
    const placement = findRecommendationPlacement(option, recommendation.id, city);
    const category = formatRecommendationCategory(recommendation.category);
    const sourceLabel = recommendationSourceLabel(recommendation);
    let titleControl;
    if (isRestaurantSuggestion(recommendation)) {
      titleControl = `<a class="recommendation-title-control restaurant-link" href="${escapeHtml(googleMapsRestaurantUrl(city, recommendation.area))}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(`${recommendation.title}. ${t("restaurantResults")}`)}">${escapeHtml(recommendation.title)}<i data-lucide="external-link" aria-hidden="true"></i></a>`;
    } else if (recommendation.source) {
      titleControl = `<a class="recommendation-title-control official-activity-link" href="${escapeHtml(recommendation.source)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(`${recommendation.title}. ${sourceLabel}`)}">${escapeHtml(recommendation.title)}<i data-lucide="external-link" aria-hidden="true"></i></a>`;
    } else {
      titleControl = `<button class="recommendation-title-control" type="button" data-recommendation-preview="${escapeHtml(recommendation.id)}" data-recommendation-city="${escapeHtml(city)}" aria-label="${escapeHtml(`${recommendation.title}. ${t("moreInfo")}`)}">${escapeHtml(recommendation.title)}<i data-lucide="info" aria-hidden="true"></i></button>`;
    }
    const source = recommendation.source
      ? `<a class="recommendation-source" href="${escapeHtml(recommendation.source)}" target="_blank" rel="noopener noreferrer"><i data-lucide="external-link" aria-hidden="true"></i>${escapeHtml(sourceLabel)}</a>`
      : `<span class="recommendation-source muted"><i data-lucide="circle-help" aria-hidden="true"></i>${escapeHtml(t("officialCheck"))}</span>`;
    const actionLabel = placement ? `${t("addedToTrip")} · Day ${placement.day.day}` : t("addToTrip");
    return `
      <article class="recommendation-item">
        <span class="recommendation-icon"><i data-lucide="${escapeHtml(recommendation.icon || "map-pin")}" aria-hidden="true"></i></span>
        <div class="recommendation-content">
          <div class="recommendation-title-row"><strong>${titleControl}</strong><span>${escapeHtml(category)}</span></div>
          <div class="recommendation-meta"><span><i data-lucide="map-pin" aria-hidden="true"></i>${escapeHtml(recommendation.area)}</span><span><i data-lucide="clock-3" aria-hidden="true"></i>${escapeHtml(formatRecommendationBestTime(recommendation.bestTime))} · ${escapeHtml(formatRecommendationDuration(recommendation.duration))}</span></div>
          <p>${escapeHtml(recommendation.detail)}</p>
          <div class="recommendation-actions">${source}<button class="recommendation-add ${placement ? "is-added" : ""}" type="button" data-add-recommendation="${escapeHtml(recommendation.id)}" data-recommendation-city="${escapeHtml(city)}" ${placement ? "disabled" : ""}><i data-lucide="${placement ? "check" : "plus"}" aria-hidden="true"></i>${escapeHtml(actionLabel)}</button></div>
        </div>
      </article>
    `;
  }

  function recommendationSourceLabel(recommendation) {
    return recommendation?.sourceKind === "website" ? t("placeWebsite") : t("officialGuide");
  }

  function openItineraryItemDetails(dayIndex, itemIndex, trigger) {
    const trip = state.currentTrip;
    const option = trip?.options?.[state.option] || trip?.options?.balanced;
    const day = option?.days?.[dayIndex];
    const item = day?.items?.[itemIndex];
    if (!item) return;
    openItineraryDetailWindow(item, {
      city: item.recommendationCity || day.city || getTripStops(trip)[0]?.city || trip.destination,
      day: day.day,
      time: item.time,
    }, trigger);
  }

  function openRecommendationDetails(recommendationId, city, trigger) {
    const recommendation = (getDestinationInfo(city).recommendations || []).find((candidate) => candidate.id === recommendationId);
    if (!recommendation) return;
    openItineraryDetailWindow(recommendation, { city, area: recommendation.area, time: capitalize(recommendation.bestTime) }, trigger);
  }

  function resolveItinerarySource(item, city) {
    if (item?.source) return item;
    const itemTitle = normalizeCity(item?.title);
    if (!itemTitle || !city) return null;
    return (getDestinationInfo(city).recommendations || []).find((recommendation) => {
      if (!recommendation.source) return false;
      const recommendationTitle = normalizeCity(recommendation.title);
      return recommendationTitle === itemTitle
        || recommendationTitle.includes(itemTitle)
        || itemTitle.includes(recommendationTitle);
    }) || null;
  }

  function openItineraryDetailWindow(item, context, trigger) {
    const language = document.documentElement.lang === "he" ? "he" : "en";
    const isEvent = item.category === "event" || /event|festival|performance|cinema|music|concert|sunset/i.test(item.title || "");
    const typeLabel = isEvent ? t("eventDetails") : item.category === "transport" ? t("activityDetails") : t("placeDetails");
    const city = context.city || "";
    const location = context.area || item.area || "";
    const meta = [
      city ? `<span><i data-lucide="map-pin" aria-hidden="true"></i>${escapeHtml(city)}</span>` : "",
      context.day ? `<span><i data-lucide="calendar-days" aria-hidden="true"></i>Day ${escapeHtml(context.day)}</span>` : "",
      context.time ? `<span><i data-lucide="clock-3" aria-hidden="true"></i>${escapeHtml(context.time)}</span>` : "",
      location ? `<span><i data-lucide="navigation" aria-hidden="true"></i>${escapeHtml(location)}</span>` : "",
    ].filter(Boolean).join("");
    const mapQuery = [item.title, location, city].filter(Boolean).join(", ");
    const source = resolveItinerarySource(item, city);
    const sourceLabel = source?.sourceKind === "website"
      ? t("placeWebsite")
      : language === "he" ? "אתר רשמי" : "Official site";
    const sourceAction = source?.source
      ? `<a class="secondary" href="${escapeHtml(source.source)}" target="_blank" rel="noopener noreferrer"><i data-lucide="external-link" aria-hidden="true"></i>${escapeHtml(sourceLabel)}</a>`
      : "";

    detailReturnFocus = trigger || null;
    byId("itineraryDetailEyebrow").textContent = typeLabel;
    byId("itineraryDetailTitle").textContent = item.title || t("moreInfo");
    byId("itineraryDetailMeta").innerHTML = meta;
    byId("itineraryDetailSummary").textContent = item.detail || t("placePlanningNote");
    byId("itineraryDetailNote").textContent = isEvent ? t("eventTimingNote") : t("placePlanningNote");
    byId("itineraryDetailActions").innerHTML = `${sourceAction}<a class="primary" href="${escapeHtml(googleMapsSearchUrl(mapQuery))}" target="_blank" rel="noopener noreferrer"><i data-lucide="map" aria-hidden="true"></i>${escapeHtml(t("viewOnMaps"))}</a>`;
    itineraryDetailModal.querySelector(".itinerary-detail-close").setAttribute("aria-label", t("closeDetails"));
    itineraryDetailModal.classList.remove("hidden");
    itineraryDetailModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("itinerary-modal-open");
    refreshIcons();
    itineraryDetailModal.querySelector(".itinerary-detail-sheet").focus();
  }

  function closeItineraryDetails() {
    itineraryDetailModal.classList.add("hidden");
    itineraryDetailModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("itinerary-modal-open");
    if (detailReturnFocus?.isConnected) detailReturnFocus.focus();
    detailReturnFocus = null;
  }

  function openTravelReadiness(trigger) {
    readinessReturnFocus = trigger || null;
    restoreReadinessOverview();
    travelReadinessModal.querySelector(".itinerary-detail-close").setAttribute("aria-label", `${t("closeDetails")}: ${t("travelReadiness")}`);
    travelReadinessModal.classList.remove("hidden");
    travelReadinessModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("itinerary-modal-open");
    refreshIcons();
    travelReadinessModal.querySelector(".readiness-modal-sheet").focus();
  }

  function closeTravelReadiness() {
    restoreReadinessOverview();
    travelReadinessModal.classList.add("hidden");
    travelReadinessModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("itinerary-modal-open");
    if (readinessReturnFocus?.isConnected) readinessReturnFocus.focus();
    readinessReturnFocus = null;
  }

  function openRequirementsInReadiness() {
    const panel = byId("standaloneToolPanel");
    const overview = travelReadinessModal.querySelector("[data-readiness-overview]");
    const requirementsView = byId("travelRequirementsView");
    const sheet = travelReadinessModal.querySelector(".readiness-modal-sheet");
    if (!panel || !overview || !requirementsView || !travelRequirementsHost || !sheet) return;

    if (!requirementsPanelParent) {
      requirementsPanelParent = panel.parentElement;
      requirementsPanelNextSibling = panel.nextElementSibling;
    }
    window.CoTravelLegacy?.showService?.("requirements", { scroll: false });
    travelRequirementsHost.appendChild(panel);
    panel.classList.remove("hidden");
    overview.classList.add("hidden");
    requirementsView.classList.remove("hidden");
    sheet.classList.add("show-requirements");
    sheet.setAttribute("aria-labelledby", "travelRequirementsTitle");
    refreshIcons();
    requirementsView.querySelector("[data-readiness-back]")?.focus();
  }

  function restoreReadinessOverview() {
    const panel = byId("standaloneToolPanel");
    const overview = travelReadinessModal.querySelector("[data-readiness-overview]");
    const requirementsView = byId("travelRequirementsView");
    const sheet = travelReadinessModal.querySelector(".readiness-modal-sheet");
    if (panel && requirementsPanelParent && panel.parentElement !== requirementsPanelParent) {
      if (requirementsPanelNextSibling?.parentElement === requirementsPanelParent) {
        requirementsPanelParent.insertBefore(panel, requirementsPanelNextSibling);
      } else {
        requirementsPanelParent.appendChild(panel);
      }
      window.CoTravelLegacy?.showHome?.();
    }
    overview?.classList.remove("hidden");
    requirementsView?.classList.add("hidden");
    sheet?.classList.remove("show-requirements");
    sheet?.setAttribute("aria-labelledby", "travelReadinessTitle");
  }

  function findRecommendationPlacement(option, recommendationId, city) {
    for (const day of option?.days || []) {
      const item = (day.items || []).find((candidate) => candidate.recommendationId === recommendationId
        && (!candidate.recommendationCity || normalizeCity(candidate.recommendationCity) === normalizeCity(city)));
      if (item) return { day, item };
    }
    return null;
  }

  function addRecommendationToSelectedPlan(recommendationId, city) {
    const trip = state.currentTrip;
    if (!trip?.options) return;
    const selectedCity = city || getTripStops(trip)[0]?.city || trip.destination;
    const info = getDestinationInfo(selectedCity);
    const recommendation = (info.recommendations || []).find((candidate) => candidate.id === recommendationId);
    const optionKey = trip.options[state.option] ? state.option : "balanced";
    const option = trip.options[optionKey];
    if (!recommendation || !option) return;
    if (findRecommendationPlacement(option, recommendationId, selectedCity)) {
      showToast(t("alreadyAdded"));
      return;
    }

    const cityDays = option.days.filter((day) => !day.city || normalizeCity(day.city) === normalizeCity(selectedCity));
    const availableDays = cityDays.length ? cityDays : option.days;
    const candidateDays = availableDays.length > 2 ? availableDays.slice(1) : availableDays;
    const smallestDaySize = Math.min(...candidateDays.map((day) => day.items.length));
    const leastBusyDays = candidateDays.filter((day) => day.items.length === smallestDaySize);
    const hash = [...`${selectedCity}:${recommendation.id}`].reduce((total, character) => total + character.charCodeAt(0), 0);
    const day = leastBusyDays[hash % leastBusyDays.length];
    const time = findOpenRecommendationTime(day, recommendation.bestTime, trip.profile?.pace);
    day.items.push({
      time,
      title: recommendation.title,
      detail: `${recommendation.detail} · ${formatRecommendationDuration(recommendation.duration)}`,
      recommendationId: recommendation.id,
      recommendationCity: selectedCity,
      source: recommendation.source,
      sourceKind: recommendation.sourceKind,
      category: recommendation.category,
      area: recommendation.area,
    });
    day.items.sort((left, right) => left.time.localeCompare(right.time));
    trip.selectedOption = optionKey;
    trip.updatedAt = new Date().toISOString();
    if (isTripSaved(trip.id)) upsertTrip(trip);
    renderTripResult();
    showToast(t("addedPlacement").replace("{day}", day.day).replace("{time}", time));

    window.setTimeout(() => {
      const addedItem = [...tripResultContent.querySelectorAll("[data-recommendation-id]")].find((element) => element.dataset.recommendationId === recommendation.id
        && normalizeCity(element.dataset.recommendationCity) === normalizeCity(selectedCity));
      if (!addedItem) return;
      addedItem.classList.add("just-added");
      const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
      addedItem.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "center" });
      addedItem.focus({ preventScroll: true });
    }, 0);
  }

  function findOpenRecommendationTime(day, bestTime, pace) {
    const baseTimes = pace === "slow"
      ? { morning: "10:00", afternoon: "15:30", evening: "20:30" }
      : { morning: "09:00", afternoon: "15:00", evening: "20:00" };
    const start = baseTimes[bestTime] || baseTimes.afternoon;
    const occupied = new Set(day.items.map((item) => item.time));
    let [hours, minutes] = start.split(":").map(Number);
    while (occupied.has(`${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`)) {
      minutes += 30;
      hours += Math.floor(minutes / 60);
      minutes %= 60;
    }
    return `${String(Math.min(hours, 23)).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
  }

  function formatRecommendationDuration(minutes) {
    const isHebrew = document.documentElement.lang === "he";
    if (isHebrew) {
      if (!Number.isFinite(minutes) || minutes < 60) return `${minutes || 30} דק׳`;
      const hours = Math.floor(minutes / 60);
      const remainder = minutes % 60;
      return `${hours} שע׳${remainder ? ` ${remainder} דק׳` : ""}`;
    }
    if (!Number.isFinite(minutes) || minutes < 60) return `${minutes || 30} min`;
    const hours = Math.floor(minutes / 60);
    const remainder = minutes % 60;
    return `${hours} hr${hours > 1 ? "s" : ""}${remainder ? ` ${remainder} min` : ""}`;
  }

  function formatRecommendationCategory(category) {
    if (document.documentElement.lang !== "he") return category === "daytrip" ? "Day trip" : capitalize(category);
    return ({ sight: "אתר", culture: "תרבות", nature: "טבע", food: "אוכל", event: "אירוע או מופע", daytrip: "טיול יום", neighborhood: "שכונה", experience: "חוויה" })[category] || category;
  }

  function formatRecommendationBestTime(bestTime) {
    if (document.documentElement.lang !== "he") return capitalize(bestTime);
    return ({ morning: "בוקר", afternoon: "אחר הצהריים", evening: "ערב" })[bestTime] || bestTime;
  }

  function getPublishedCommunityTrips() {
    return readTrips().filter((trip) => trip.published).map(communityCardFromSavedTrip);
  }

  function communityCardFromSavedTrip(trip) {
    const source = communityTrips.find((candidate) => candidate.id === trip.sourcePlanId);
    return {
      id: trip.id,
      destination: trip.destination,
      title: source?.title || trip.options?.[trip.selectedOption || "balanced"]?.title || `${trip.destination} trip`,
      summary: source?.summary || "A locally published plan ready to review and customize on this device.",
      nights: trip.nights,
      category: source?.category || ["city"],
      tags: buildProfileTags(trip.profile).slice(0, 3),
      rating: trip.userRating || source?.rating || 5,
      ratings: trip.userRating ? 1 : source?.ratings || 0,
      saves: source?.saves || 1,
      visual: getDestinationInfo(getTripStops(trip)[0]?.city || trip.destination).visual,
      creator: trip.published ? "You" : source?.creator || "You",
      storySourceId: source?.id || trip.sourcePlanId || "",
      localTrip: trip,
    };
  }

  function findCommunityTrip(id) {
    return communityTrips.find((trip) => trip.id === id)
      || getPublishedCommunityTrips().find((trip) => trip.id === id)
      || null;
  }

  function createCommunityPreviewTrip(card) {
    const profile = {
      pace: card.tags.includes("slow") ? "slow" : "balanced",
      structure: "balanced",
      crowds: "timed",
      interests: card.tags.filter((tag) => tag !== "slow"),
      mobility: "none",
      dietary: "",
      constraints: "",
    };
    const trip = {
      id: `preview-${card.id}`,
      destination: card.destination,
      primaryDestination: card.destination,
      destinations: [{ city: card.destination, nights: card.nights }],
      origin: "",
      startDate: byId("quickStartDate").value,
      nights: card.nights,
      group: "couple",
      budget: "comfort",
      companions: "",
      profile,
      sourcePlanId: card.id,
      createdAt: new Date().toISOString(),
      selectedOption: "balanced",
      published: false,
    };
    trip.options = buildPlanOptions(trip);
    return trip;
  }

  function openTripStory(card) {
    const trip = card.localTrip || createCommunityPreviewTrip(card);
    if (!trip.options) trip.options = buildPlanOptions(trip);
    state.storyReturnView = state.view === "saved" ? "saved" : "discover";
    state.storyTrip = { card, trip };
    renderTripStory();
    showView("story");
  }

  function getCommunityStory(card) {
    const storyId = card.storySourceId || card.localTrip?.sourcePlanId || card.id;
    const configured = communityTripStories[storyId];
    if (configured) return configured;
    const city = getTripStops(card.localTrip)[0]?.city || card.destination;
    const photo = getDestinationInfo(city).photo;
    return {
      lead: card.summary,
      gallery: photo ? [{ title: localizedDestinationName(city), ...photo }] : [],
    };
  }

  function isCommunityStorySaved(card) {
    if (card.localTrip) return isTripSaved(card.localTrip.id);
    return readTrips().some((trip) => trip.sourcePlanId === card.id);
  }

  function readCommunityRatings() {
    try {
      const ratings = JSON.parse(localStorage.getItem(storageKeys.communityRatings) || "{}");
      return ratings && typeof ratings === "object" ? ratings : {};
    } catch {
      return {};
    }
  }

  function getStoryRating(card) {
    return Number(card.localTrip?.userRating || readCommunityRatings()[card.storySourceId || card.id] || 0);
  }

  function saveStoryRating(card, value) {
    const rating = Math.max(1, Math.min(5, Math.round(value)));
    if (card.localTrip) {
      card.localTrip.userRating = rating;
      card.localTrip.updatedAt = new Date().toISOString();
      upsertTrip(card.localTrip);
      return;
    }
    const ratings = readCommunityRatings();
    ratings[card.id] = rating;
    localStorage.setItem(storageKeys.communityRatings, JSON.stringify(ratings));
  }

  function renderTripStory() {
    if (!state.storyTrip) return;
    const { card, trip } = state.storyTrip;
    const option = trip.options?.[trip.selectedOption || "balanced"] || trip.options?.balanced;
    if (!option) return;
    const story = getCommunityStory(card);
    const city = getTripStops(trip)[0]?.city || card.destination;
    const destinationName = localizedDestinationName(city);
    const gallery = story.gallery.length ? story.gallery : [getDestinationInfo(city).photo].filter(Boolean);
    const hero = gallery[0];
    const itemCount = option.days.reduce((total, day) => total + day.items.length, 0);
    const userRating = getStoryRating(card);
    const saved = isCommunityStorySaved(card);
    const starButtons = [1, 2, 3, 4, 5].map((rating) => `<button class="story-star ${rating <= userRating ? "active" : ""}" type="button" data-story-action="rate" data-rating="${rating}" aria-label="${escapeHtml(`${t("rateThisTrip")}: ${rating}`)}" aria-pressed="${String(rating === userRating)}"><i data-lucide="star" aria-hidden="true"></i></button>`).join("");
    const galleryMarkup = gallery.map((photo, index) => `
      <figure class="story-gallery-card ${index === 0 ? "featured" : ""}">
        <img src="${escapeHtml(photo.src)}" alt="${escapeHtml(photo.alt || photo.title || destinationName)}" loading="${index === 0 ? "eager" : "lazy"}">
        <figcaption><strong>${escapeHtml(photo.title || destinationName)}</strong><a href="${escapeHtml(photo.page)}" target="_blank" rel="noopener noreferrer">${escapeHtml(photo.credit)} · Unsplash</a></figcaption>
      </figure>`).join("");
    const daysMarkup = option.days.map((day, dayIndex) => {
      const photo = gallery[dayIndex % gallery.length];
      const items = day.items.map((item) => `
        <li>
          <time>${escapeHtml(item.time)}</time>
          <span><strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(item.detail)}</small></span>
          <a href="${escapeHtml(googleMapsSearchUrl(`${item.title}, ${day.city || city}`))}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(`${item.title}: ${t("viewOnMap")}`)}"><i data-lucide="map-pin" aria-hidden="true"></i></a>
        </li>`).join("");
      return `
        <article class="story-day-card">
          <div class="story-day-image">
            <img src="${escapeHtml(photo.src)}" alt="${escapeHtml(photo.alt || destinationName)}" loading="lazy">
            <span>${escapeHtml(t("dayLabel"))} ${day.day}</span>
          </div>
          <div class="story-day-content">
            <p>${escapeHtml(day.city ? localizedDestinationName(day.city) : destinationName)}</p>
            <h3>${escapeHtml(day.theme)}</h3>
            <ol>${items}</ol>
          </div>
        </article>`;
    }).join("");
    tripStoryContent.innerHTML = `
      <article class="trip-story-page">
        <section class="trip-story-hero ${escapeHtml(card.visual || "visual-coast")}">
          ${hero ? `<img src="${escapeHtml(hero.src)}" alt="${escapeHtml(hero.alt || destinationName)}">` : ""}
          <div class="trip-story-hero-shade"></div>
          <button class="trip-story-back" type="button" data-story-action="back"><i data-lucide="arrow-left" aria-hidden="true"></i>${escapeHtml(t("backToTrips"))}</button>
          <div class="trip-story-hero-copy">
            <span class="eyebrow">${escapeHtml(t("storyEyebrow"))}</span>
            <h1>${escapeHtml(card.title)}</h1>
            <p>${escapeHtml(story.lead || card.summary)}</p>
            <div class="trip-story-meta">
              <span><i data-lucide="map-pin" aria-hidden="true"></i>${escapeHtml(destinationName)}</span>
              <span><i data-lucide="moon" aria-hidden="true"></i>${trip.nights} ${escapeHtml(t("nights").toLowerCase())}</span>
              <span><i data-lucide="star" aria-hidden="true"></i>${card.rating} · ${card.ratings}</span>
              <span><i data-lucide="user-round" aria-hidden="true"></i>${escapeHtml(t("createdBy"))} ${escapeHtml(card.creator)}</span>
            </div>
          </div>
          ${hero ? `<a class="trip-story-hero-credit" href="${escapeHtml(hero.page)}" target="_blank" rel="noopener noreferrer">${escapeHtml(hero.credit)} · Unsplash</a>` : ""}
        </section>

        <section class="trip-story-toolbar" aria-label="Trip actions">
          <div class="trip-story-actions">
            <button class="secondary" type="button" data-story-action="pdf"><i data-lucide="file-down" aria-hidden="true"></i>${escapeHtml(t("downloadPdf"))}</button>
            <button class="secondary" type="button" data-story-action="save" ${saved ? "disabled" : ""}><i data-lucide="bookmark" aria-hidden="true"></i>${escapeHtml(saved ? t("tripAlreadySaved") : t("saveThisTrip"))}</button>
            <button class="primary" type="button" data-story-action="customize"><i data-lucide="wand-sparkles" aria-hidden="true"></i>${escapeHtml(t("usePlan"))}</button>
          </div>
          <div class="trip-story-rating"><strong>${escapeHtml(t("rateThisTrip"))}</strong><span>${starButtons}</span></div>
        </section>

        <section class="trip-story-gallery-section">
          <div><span class="eyebrow">${escapeHtml(destinationName)}</span><h2>${escapeHtml(t("tripHighlights"))}</h2></div>
          <div class="trip-story-gallery">${galleryMarkup}</div>
        </section>

        <section class="trip-story-journey">
          <main>
            <span class="eyebrow">${escapeHtml(`${trip.nights} ${t("nights").toLowerCase()}`)}</span>
            <h2>${escapeHtml(t("tripJourney"))}</h2>
            <div class="story-day-list">${daysMarkup}</div>
          </main>
          <aside class="trip-story-glance">
            <span class="eyebrow">${escapeHtml(t("tripAtGlance"))}</span>
            <h2>${escapeHtml(card.title)}</h2>
            <p>${escapeHtml(card.summary)}</p>
            <dl>
              <div><dt><i data-lucide="calendar-days" aria-hidden="true"></i>${escapeHtml(t("nights"))}</dt><dd>${trip.nights}</dd></div>
              <div><dt><i data-lucide="map-pinned" aria-hidden="true"></i>${escapeHtml(t("sitesIncluded"))}</dt><dd>${itemCount}</dd></div>
              <div><dt><i data-lucide="bookmark" aria-hidden="true"></i>${escapeHtml(t("saved"))}</dt><dd>${card.saves}</dd></div>
            </dl>
            <div class="trip-tags">${card.tags.map((tag) => `<span class="trip-tag">${escapeHtml(capitalize(tag))}</span>`).join("")}</div>
            <button class="primary" type="button" data-story-action="customize">${escapeHtml(t("usePlan"))}<i data-lucide="arrow-right" aria-hidden="true"></i></button>
          </aside>
        </section>
      </article>`;
    refreshIcons();
  }

  function downloadTripPdf(trip, card) {
    try {
      const option = trip.options?.[trip.selectedOption || "balanced"] || trip.options?.balanced;
      if (!option) throw new Error("Trip itinerary is unavailable");
      const bytes = createTripPdf(trip, card, option);
      const blob = new Blob([bytes], { type: "application/pdf" });
      const link = document.createElement("a");
      const fileName = `${String(card.title || trip.destination || "trip-plan").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "trip-plan"}.pdf`;
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(link.href), 1000);
      showToast(t("pdfDownloaded"));
    } catch (error) {
      console.error("Trip PDF creation failed", error);
      showToast(t("pdfFailed"));
    }
  }

  function createTripPdf(trip, card, option) {
    const pageWidth = 595;
    const pageHeight = 842;
    const margin = 48;
    const pages = [[]];
    let pageIndex = 0;
    let y = 686;
    const currentPage = () => pages[pageIndex];
    const addPage = () => {
      pages.push([]);
      pageIndex += 1;
      y = 786;
      currentPage().push(pdfTextCommand(card.title, margin, 806, 9, "F2", "0.09 0.31 0.32"));
    };
    const ensureSpace = (height) => { if (y - height < 54) addPage(); };
    const addRule = () => {
      ensureSpace(18);
      currentPage().push(`0.83 0.89 0.87 RG ${margin} ${y} m ${pageWidth - margin} ${y} l S`);
      y -= 18;
    };
    const addText = (text, { size = 10, bold = false, indent = 0, gap = 14, color = "0.09 0.20 0.22" } = {}) => {
      const maxChars = Math.max(24, Math.floor((pageWidth - (margin * 2) - indent) / (size * 0.52)));
      pdfWrapText(text, maxChars).forEach((line) => {
        ensureSpace(gap);
        currentPage().push(pdfTextCommand(line, margin + indent, y, size, bold ? "F2" : "F1", color));
        y -= gap;
      });
    };

    currentPage().push("0.09 0.31 0.32 rg 0 720 595 122 re f");
    currentPage().push(pdfTextCommand(localizedDestinationName(trip.destination, "en").toUpperCase(), margin, 804, 9, "F2", "0.89 0.74 0.42"));
    currentPage().push(pdfTextCommand(card.title, margin, 772, 24, "F2", "1 1 1"));
    currentPage().push(pdfTextCommand(`${trip.nights} nights  |  ${card.rating} rating  |  by ${card.creator}`, margin, 742, 10, "F1", "0.90 0.96 0.95"));
    addText(card.summary, { size: 12, gap: 17, color: "0.25 0.34 0.35" });
    y -= 6;
    addText("TRIP AT A GLANCE", { size: 9, bold: true, color: "0.05 0.43 0.43" });
    addText(`${option.days.length} days  |  ${option.days.reduce((total, day) => total + day.items.length, 0)} places and experiences  |  ${card.tags.join(" / ")}`, { size: 10 });
    y -= 8;
    addRule();

    option.days.forEach((day) => {
      ensureSpace(92 + (day.items.length * 42));
      addText(`DAY ${day.day}  -  ${day.theme}`, { size: 14, bold: true, gap: 20, color: "0.05 0.43 0.43" });
      if (day.city) addText(day.city, { size: 9, bold: true, color: "0.43 0.51 0.51" });
      day.items.forEach((item) => {
        addText(`${item.time}  ${item.title}`, { size: 11, bold: true, indent: 8, gap: 15 });
        addText(item.detail, { size: 9, indent: 28, gap: 12, color: "0.38 0.47 0.48" });
        y -= 5;
      });
      addRule();
    });

    addText("Built with Co-Travel. Verify opening hours, reservations, prices, and official travel requirements before booking.", { size: 8, color: "0.43 0.51 0.51" });
    return buildPdfBytes(pages, pageWidth, pageHeight);
  }

  function pdfWrapText(value, maxChars) {
    const words = pdfSafeText(value).split(/\s+/).filter(Boolean);
    const lines = [];
    let line = "";
    words.forEach((word) => {
      const candidate = line ? `${line} ${word}` : word;
      if (candidate.length > maxChars && line) {
        lines.push(line);
        line = word;
      } else {
        line = candidate;
      }
    });
    if (line) lines.push(line);
    return lines.length ? lines : [""];
  }

  function pdfSafeText(value) {
    return String(value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[\u2013\u2014]/g, "-")
      .replace(/[\u2018\u2019]/g, "'")
      .replace(/[\u201c\u201d]/g, '"')
      .replace(/[^\x20-\x7E]/g, "?");
  }

  function pdfTextCommand(value, x, y, size, font, color) {
    const escaped = pdfSafeText(value).replace(/([\\()])/g, "\\$1");
    return `BT /${font} ${size} Tf ${color} rg ${x} ${y} Td (${escaped}) Tj ET`;
  }

  function buildPdfBytes(pages, pageWidth, pageHeight) {
    const objects = [];
    const pageIds = pages.map((_, index) => 5 + (index * 2));
    objects[1] = "<< /Type /Catalog /Pages 2 0 R >>";
    objects[2] = `<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${pages.length} >>`;
    objects[3] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>";
    objects[4] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>";
    pages.forEach((commands, index) => {
      const pageId = pageIds[index];
      const contentId = pageId + 1;
      const stream = commands.join("\n");
      objects[pageId] = `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${contentId} 0 R >>`;
      objects[contentId] = `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`;
    });
    let output = "%PDF-1.4\n";
    const offsets = [0];
    for (let id = 1; id < objects.length; id += 1) {
      offsets[id] = output.length;
      output += `${id} 0 obj\n${objects[id]}\nendobj\n`;
    }
    const xrefOffset = output.length;
    output += `xref\n0 ${objects.length}\n0000000000 65535 f \n`;
    for (let id = 1; id < objects.length; id += 1) output += `${String(offsets[id]).padStart(10, "0")} 00000 n \n`;
    output += `trailer\n<< /Size ${objects.length} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
    return new TextEncoder().encode(output);
  }

  function renderCommunityTrips() {
    const localPublished = getPublishedCommunityTrips();
    const allTrips = [...localPublished, ...communityTrips];
    const visible = state.filter === "all" ? allTrips : allTrips.filter((trip) => trip.category.includes(state.filter));
    communityTripGrid.innerHTML = visible.map((trip) => {
      const info = getDestinationInfo(trip.localTrip ? getTripStops(trip.localTrip)[0]?.city : trip.destination);
      const destinationName = trip.localTrip ? localizedTripDestinationLabel(trip.localTrip) : localizedDestinationName(trip.destination);
      const image = info.photo ? `<img class="community-card-image" src="${escapeHtml(info.photo.src)}" alt="${escapeHtml(info.photo.alt)}" loading="lazy"><a class="community-photo-credit" href="${escapeHtml(info.photo.page)}" target="_blank" rel="noopener noreferrer">${escapeHtml(info.photo.credit)} · Unsplash</a>` : "";
      return `
        <article class="community-card">
          <div class="community-card-visual ${escapeHtml(trip.visual)}">${image}<span class="community-badge"><i data-lucide="star" aria-hidden="true"></i>${trip.rating} · ${trip.ratings} ratings</span><strong>${escapeHtml(destinationName)}</strong></div>
          <div class="community-card-body">
            <h3>${escapeHtml(trip.title)}</h3>
            <p>${escapeHtml(trip.summary)}</p>
            <div class="trip-tags">${trip.tags.slice(0, 3).map((tag) => `<span class="trip-tag">${escapeHtml(capitalize(tag))}</span>`).join("")}</div>
            <div class="community-meta"><span><i data-lucide="moon" aria-hidden="true"></i>${trip.nights} nights</span><span><i data-lucide="bookmark" aria-hidden="true"></i>${trip.saves}</span><span>by ${escapeHtml(trip.creator)}</span></div>
            <div class="community-actions">
              <button class="primary community-view-action" type="button" data-community-action="view" data-trip-id="${escapeHtml(trip.id)}"><i data-lucide="eye" aria-hidden="true"></i>${escapeHtml(t("viewTrip"))}</button>
              <button class="secondary" type="button" data-community-action="save" data-trip-id="${escapeHtml(trip.id)}">${escapeHtml(t("saveIdea"))}</button>
              <button class="secondary" type="button" data-community-action="use" data-trip-id="${escapeHtml(trip.id)}">${escapeHtml(t("usePlan"))}</button>
            </div>
          </div>
        </article>
      `;
    }).join("");
    refreshIcons();
  }

  function renderSavedTrips() {
    const trips = readTrips();
    if (!trips.length) {
      savedTripsGrid.innerHTML = `<div class="empty-saved"><span><i data-lucide="luggage" aria-hidden="true"></i></span><h2>${escapeHtml(t("emptySaved"))}</h2><p>${escapeHtml(t("emptySavedBody"))}</p><button class="primary" type="button" data-planner-view="planner">${escapeHtml(t("newTrip"))}</button></div>`;
      savedTripsGrid.querySelector("[data-planner-view]")?.addEventListener("click", () => showView("planner"));
      refreshIcons();
      return;
    }
    savedTripsGrid.innerHTML = trips.sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt))).map((trip) => `
      <article class="saved-trip-card">
        <span class="eyebrow">${escapeHtml(trip.published ? t("published") : t("saved"))}</span>
        <h3>${escapeHtml(localizedTripDestinationLabel(trip))}</h3>
        <p>${escapeHtml(formatDate(trip.startDate, document.documentElement.lang))} · ${trip.nights} nights · ${escapeHtml(capitalize(trip.budget || "comfort"))}</p>
        <div class="trip-tags">${buildProfileTags(trip.profile).slice(0, 3).map((tag) => `<span class="trip-tag">${escapeHtml(tag)}</span>`).join("")}</div>
        <div class="saved-trip-actions"><button class="secondary" type="button" data-saved-action="delete" data-trip-id="${escapeHtml(trip.id)}">${escapeHtml(t("deleteTrip"))}</button><button class="secondary" type="button" data-saved-action="customize" data-trip-id="${escapeHtml(trip.id)}">${escapeHtml(t("customize"))}</button><button class="primary" type="button" data-saved-action="open" data-trip-id="${escapeHtml(trip.id)}">${escapeHtml(t("openTrip"))}</button></div>
      </article>
    `).join("");
    refreshIcons();
  }

  function seedPlannerFromCommunity(trip) {
    if (trip.localTrip) {
      loadTripIntoPlanner(trip.localTrip);
      return;
    }
    byId("plannerDestination").value = localizedDestinationName(trip.destination);
    byId("plannerDuration").value = String(trip.nights);
    setRouteMode("single", { seedFromDestination: false });
    state.sourcePlanId = trip.id;
    document.querySelectorAll(".interest-picker input").forEach((input) => { input.checked = trip.tags.includes(input.value); });
    if (trip.tags.includes("slow")) selectConceptAnswer("pace", "slow");
    state.step = 1;
    showView("planner");
  }

  function saveCommunityIdea(trip) {
    if (trip.localTrip) {
      upsertTrip(trip.localTrip);
      showToast(t("ideaSaved"));
      return;
    }
    const profile = { pace: trip.tags.includes("slow") ? "slow" : "balanced", structure: "balanced", crowds: "timed", interests: trip.tags.filter((tag) => tag !== "slow"), mobility: "none", dietary: "", constraints: "" };
    const savedTrip = {
      id: `trip-${Date.now()}`,
      destination: trip.destination,
      origin: "",
      startDate: byId("quickStartDate").value,
      nights: trip.nights,
      group: "couple",
      budget: "comfort",
      companions: "",
      profile,
      sourcePlanId: trip.id,
      createdAt: new Date().toISOString(),
      selectedOption: "balanced",
      published: false,
    };
    savedTrip.options = buildPlanOptions(savedTrip);
    upsertTrip(savedTrip);
    showToast(t("ideaSaved"));
  }

  function loadTripIntoPlanner(trip, step = 1) {
    const routeStops = getTripStops(trip);
    byId("plannerDestination").value = localizedDestinationName(routeStops[0]?.city || trip.destination || "");
    byId("plannerOrigin").value = trip.origin || "";
    byId("plannerStartDate").value = trip.startDate || byId("quickStartDate").value;
    byId("plannerDuration").value = String(trip.nights || 5);
    if (routeStops.length > 1) {
      state.routeStops = routeStops.map((stop) => createRouteStop(localizedDestinationName(stop.city), stop.nights));
      setRouteMode("multi", { seedFromDestination: false });
    } else {
      setRouteMode("single", { seedFromDestination: false });
    }
    byId("plannerGroup").value = trip.group || "couple";
    byId("plannerBudget").value = trip.budget || "comfort";
    byId("plannerCompanions").value = trip.companions || "";
    byId("plannerMobility").value = trip.profile?.mobility || "none";
    byId("plannerDietary").value = trip.profile?.dietary || "";
    byId("plannerConstraints").value = trip.profile?.constraints || "";
    document.querySelectorAll(".interest-picker input").forEach((input) => { input.checked = trip.profile?.interests?.includes(input.value) || false; });
    ["pace", "structure", "crowds"].forEach((question) => selectConceptAnswer(question, trip.profile?.[question] || "balanced"));
    state.sourcePlanId = trip.sourcePlanId || null;
    state.step = step;
    showView("planner");
  }

  function selectConceptAnswer(question, value) {
    const group = document.querySelector(`.concept-question[data-question="${question}"]`);
    if (!group) return;
    const selected = group.querySelector(`button[data-value="${value}"]`) || group.querySelector("button[data-value='balanced']");
    group.querySelectorAll("button").forEach((button) => button.setAttribute("aria-pressed", String(button === selected)));
    state.preferences[question] = selected?.dataset.value || "balanced";
  }

  function findReusableTemplate(destination, interests, requestedId) {
    if (requestedId) return communityTrips.find((trip) => trip.id === requestedId) || null;
    const normalized = normalizeCity(destination);
    const exact = communityTrips.find((trip) => normalizeCity(trip.destination) === normalized);
    if (exact) return exact;
    let best = null;
    let bestScore = 0;
    communityTrips.forEach((trip) => {
      const score = trip.tags.filter((tag) => interests.includes(tag)).length;
      if (score > bestScore) { best = trip; bestScore = score; }
    });
    return bestScore >= 2 ? best : null;
  }

  function getTripStops(trip) {
    const stops = Array.isArray(trip?.destinations)
      ? trip.destinations
        .map((stop) => ({ city: String(stop?.city || "").trim(), nights: clampRouteNights(stop?.nights) }))
        .filter((stop) => stop.city)
      : [];
    if (stops.length) return stops;
    const city = String(trip?.primaryDestination || trip?.destination || "").trim();
    return city ? [{ city, nights: Math.max(1, Number(trip?.nights) || 5) }] : [];
  }

  function localizedTripDestinationLabel(trip, language = document.documentElement.lang) {
    return getTripStops(trip)
      .map((stop) => localizedDestinationName(stop.city, language))
      .join(" → ") || localizedDestinationName(trip?.destination, language);
  }

  function normalizeDestinationText(value) {
    return String(value || "").trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  function destinationCatalogEntry(value) {
    const normalized = normalizeDestinationText(value);
    return destinationCatalog.find((destination) =>
      normalizeDestinationText(destination.en) === normalized || normalizeDestinationText(destination.he) === normalized
    ) || null;
  }

  function canonicalDestinationName(value) {
    return destinationCatalogEntry(value)?.en || String(value || "").trim();
  }

  function localizedDestinationName(value, language = document.documentElement.lang) {
    const destination = destinationCatalogEntry(value);
    if (!destination) return String(value || "").trim();
    return language === "he" ? destination.he : destination.en;
  }

  function normalizeCity(value) {
    return normalizeDestinationText(canonicalDestinationName(value));
  }

  function getDestinationInfo(destination) {
    const value = String(destination || "").trim();
    const canonicalName = canonicalDestinationName(value);
    const base = destinationLibrary[canonicalName.toLowerCase()] || genericDestination(canonicalName);
    const liveRecommendations = destinationScanCache.get(normalizeCity(value))?.items || [];
    const seen = new Set();
    const recommendations = [...(base.recommendations || []), ...liveRecommendations].filter((recommendation) => {
      const key = normalizeCity(recommendation.title);
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    return { ...base, name: localizedDestinationName(canonicalName), recommendations };
  }

  async function ensureDestinationRecommendations(destination, { force = false } = {}) {
    const city = canonicalDestinationName(destination);
    const cacheKey = normalizeCity(city);
    if (!cacheKey) return [];
    const existing = destinationScanCache.get(cacheKey);
    if (existing?.status === "loading") return existing.promise;
    if (!force && existing?.status === "ready") return existing.items;
    if (!force && existing?.status === "error") return existing.items || [];

    const previousItems = existing?.items || [];
    const request = scanDestinationActivities(city)
      .then((items) => {
        destinationScanCache.set(cacheKey, { status: "ready", items, updatedAt: Date.now() });
        if (isActiveRecommendationCity(city)) renderTripResult();
        return items;
      })
      .catch((error) => {
        console.warn(`Destination scan failed for ${city}`, error);
        destinationScanCache.set(cacheKey, previousItems.length
          ? { status: "ready", items: previousItems, updatedAt: existing?.updatedAt || Date.now(), refreshError: true }
          : { status: "error", items: [], error });
        if (isActiveRecommendationCity(city)) renderTripResult();
        return previousItems;
      });
    destinationScanCache.set(cacheKey, { status: "loading", items: previousItems, promise: request });
    if (force && isActiveRecommendationCity(city)) renderTripResult();
    return request;
  }

  function isActiveRecommendationCity(city) {
    if (!state.currentTrip || state.view !== "result") return false;
    const activeCity = state.recommendationCity || getTripStops(state.currentTrip)[0]?.city || state.currentTrip.destination;
    return normalizeCity(activeCity) === normalizeCity(city);
  }

  async function scanDestinationActivities(destination) {
    const location = await resolveDestinationLocation(destination);
    const latitudeRadius = 0.055;
    const longitudeRadius = Math.min(0.12, latitudeRadius / Math.max(0.45, Math.cos(location.latitude * Math.PI / 180)));
    const bounds = [
      location.latitude - latitudeRadius,
      location.longitude - longitudeRadius,
      location.latitude + latitudeRadius,
      location.longitude + longitudeRadius,
    ].map((value) => value.toFixed(5)).join(",");
    const query = `[out:json][timeout:18];
      nwr(${bounds})["name"]["tourism"~"^(attraction|museum|gallery|viewpoint|zoo|theme_park)$"];out center 45;
      nwr(${bounds})["name"]["historic"~"^(monument|castle|archaeological_site|memorial)$"];out center 30;
      nwr(${bounds})["name"]["amenity"~"^(theatre|arts_centre|music_venue|cinema|events_venue|marketplace)$"];out center 45;
      nwr(${bounds})["name"]["leisure"~"^(park|garden)$"];out center 30;`;
    const response = await fetchOverpass(query);
    if (response.remark && !(response.elements || []).length) throw new Error(response.remark);
    return buildLiveRecommendations(response.elements || [], location, destination);
  }

  async function fetchOverpass(query) {
    const endpoints = [
      "https://maps.mail.ru/osm/tools/overpass/api/interpreter",
      "https://overpass.kumi.systems/api/interpreter",
      "https://overpass-api.de/api/interpreter",
    ];
    let lastError;
    for (const endpoint of endpoints) {
      try {
        return await fetchJson(`${endpoint}?data=${encodeURIComponent(query)}`, { headers: { Accept: "application/json" } }, 22000);
      } catch (error) {
        lastError = error;
      }
    }
    throw lastError || new Error("Live place data is unavailable.");
  }

  async function resolveDestinationLocation(destination) {
    const searchUrl = new URL("https://www.wikidata.org/w/api.php");
    searchUrl.search = new URLSearchParams({
      action: "wbsearchentities",
      search: destination,
      language: "en",
      format: "json",
      origin: "*",
      limit: "6",
      type: "item",
    });
    const searchResult = await fetchJson(searchUrl.toString(), {}, 14000);
    const candidates = Array.isArray(searchResult.search) ? searchResult.search : [];
    const placePattern = /city|town|municipality|commune|capital|village|country|island|administrative|metropolis|borough|district/i;
    const rejectedPattern = /football|club|surname|given name|album|film|song|company|team|station/i;
    const match = candidates.find((candidate) => placePattern.test(candidate.description || "") && !rejectedPattern.test(candidate.description || "")) || candidates[0];
    if (!match?.id) throw new Error("Destination could not be matched to a real location.");

    let entity = await fetchWikidataEntity(match.id);
    if (/country|sovereign state/i.test(match.description || "")) {
      const capitalId = entity.claims?.P36?.[0]?.mainsnak?.datavalue?.value?.id;
      if (capitalId) entity = await fetchWikidataEntity(capitalId);
    }
    const coordinate = entity.claims?.P625?.[0]?.mainsnak?.datavalue?.value;
    if (!Number.isFinite(coordinate?.latitude) || !Number.isFinite(coordinate?.longitude)) throw new Error("No destination coordinates were available.");
    return {
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
      label: entity.labels?.en?.value || match.label || destination,
    };
  }

  async function fetchWikidataEntity(id) {
    const url = new URL("https://www.wikidata.org/w/api.php");
    url.search = new URLSearchParams({
      action: "wbgetentities",
      ids: id,
      props: "claims|labels",
      languages: "en",
      format: "json",
      origin: "*",
    });
    const result = await fetchJson(url.toString(), {}, 14000);
    const entity = result.entities?.[id];
    if (!entity || entity.missing != null) throw new Error("Destination details were not found.");
    return entity;
  }

  async function fetchJson(url, options = {}, timeout = 18000) {
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), timeout);
    try {
      const response = await fetch(url, { ...options, signal: controller.signal });
      if (!response.ok) throw new Error(`Live data request returned ${response.status}.`);
      return await response.json();
    } finally {
      window.clearTimeout(timer);
    }
  }

  function buildLiveRecommendations(elements, location, destination) {
    const language = document.documentElement.lang === "he" ? "he" : "en";
    const seen = new Set();
    const recommendations = elements
      .map((element) => liveRecommendationFromOsm(element, location, destination, language))
      .filter((recommendation) => {
        if (!recommendation || seen.has(normalizeCity(recommendation.title))) return false;
        seen.add(normalizeCity(recommendation.title));
        return true;
      })
      .sort((left, right) => right.scanScore - left.scanScore);
    const buckets = new Map();
    recommendations.forEach((recommendation) => {
      if (!buckets.has(recommendation.category)) buckets.set(recommendation.category, []);
      buckets.get(recommendation.category).push(recommendation);
    });
    const ordered = [];
    const categories = ["sight", "culture", "nature", "food", "event"];
    while (ordered.length < 30 && categories.some((category) => buckets.get(category)?.length)) {
      categories.forEach((category) => {
        const next = buckets.get(category)?.shift();
        if (next && ordered.length < 30) ordered.push(next);
      });
    }
    return ordered;
  }

  function liveRecommendationFromOsm(element, location, destination, language) {
    const tags = element?.tags || {};
    const title = tags[`name:${language}`] || tags["name:en"] || tags.name;
    if (!title) return null;
    const definitions = {
      attraction: ["sight", "landmark", "A named visitor attraction"],
      museum: ["culture", "museum", "A real museum with collections to explore"],
      gallery: ["culture", "palette", "A named gallery or exhibition space"],
      viewpoint: ["sight", "binoculars", "A mapped viewpoint for a destination panorama"],
      zoo: ["sight", "paw-print", "A mapped visitor attraction suitable for a longer stop"],
      theme_park: ["sight", "ferris-wheel", "A mapped visitor attraction suitable for a longer stop"],
      monument: ["sight", "landmark", "A named historic monument"],
      castle: ["sight", "castle", "A named historic site"],
      archaeological_site: ["sight", "columns-3", "A named archaeological site"],
      memorial: ["sight", "landmark", "A named memorial or historic landmark"],
      theatre: ["event", "drama", "A real local theatre; check its current programme for your travel dates"],
      arts_centre: ["event", "music-2", "A real arts venue; check its current programme for your travel dates"],
      music_venue: ["event", "music-2", "A real music venue; check its current programme for your travel dates"],
      cinema: ["event", "clapperboard", "A real cinema; check its current screenings for your travel dates"],
      events_venue: ["event", "tickets", "A real event venue; check its current programme for your travel dates"],
      marketplace: ["food", "shopping-basket", "A named local market; confirm its opening days before visiting"],
      park: ["nature", "trees", "A mapped park for a slower outdoor break"],
      garden: ["nature", "flower-2", "A mapped garden for a slower outdoor break"],
    };
    const type = [tags.tourism, tags.historic, tags.amenity, tags.leisure].find((value) => definitions[value]) || tags.tourism || tags.historic || tags.amenity || tags.leisure;
    const [category, icon, description] = definitions[type] || ["sight", "map-pin", "A named place near the destination"];
    const coordinates = element.type === "node" ? element : element.center;
    const distance = coordinates ? distanceInKilometres(location.latitude, location.longitude, coordinates.lat, coordinates.lon) : 12;
    const source = normalizeWebsite(tags.website || tags["contact:website"] || tags.url);
    const score = (source ? 9 : 0) + (tags.wikidata ? 5 : 0) + (tags.wikipedia ? 4 : 0) + (tags.tourism ? 3 : 0) + Math.max(0, 7 - distance / 2);
    const area = tags["addr:suburb"] || tags["addr:quarter"] || tags["addr:district"] || tags["addr:city"] || location.label || destination;
    const duration = category === "event" ? 150 : category === "nature" || category === "food" ? 90 : 120;
    const bestTime = category === "event" ? "evening" : category === "food" ? "afternoon" : distance > 7 ? "morning" : "afternoon";
    const detail = language === "he"
      ? ({
          sight: "אתר מזוהה וממופה ליד היעד. יש לבדוק גישה, שעות פתיחה והזמנות לפני הביקור.",
          culture: "מוזיאון או מרכז תרבות מזוהה. יש לבדוק תערוכות, שעות פתיחה והזמנות לפני הביקור.",
          nature: "פארק או גן ממופה שמתאים להפוגה רגועה. יש לבדוק גישה ושעות פתיחה.",
          food: "שוק מקומי מזוהה. יש לבדוק ימי פעילות, שעות פתיחה והתאמה לצרכים תזונתיים.",
          event: "מוקד תרבות או מופעים פעיל. יש לבדוק את התוכנית המעודכנת לתאריכי הנסיעה.",
        })[category]
      : `${description}. Verify current access, hours, and reservations before visiting.`;
    return {
      id: `osm-${element.type}-${element.id}`,
      title,
      category,
      area,
      bestTime,
      duration,
      icon,
      detail,
      source,
      sourceKind: source ? "website" : "",
      scanScore: score,
    };
  }

  function normalizeWebsite(value) {
    const raw = String(value || "").trim().split(/[;,]/)[0];
    if (!raw) return "";
    const candidate = /^https?:\/\//i.test(raw) ? raw : `https://${raw.replace(/^\/\//, "")}`;
    try {
      const url = new URL(candidate);
      return ["http:", "https:"].includes(url.protocol) ? url.toString() : "";
    } catch {
      return "";
    }
  }

  function distanceInKilometres(lat1, lon1, lat2, lon2) {
    const radians = (value) => value * Math.PI / 180;
    const deltaLat = radians(lat2 - lat1);
    const deltaLon = radians(lon2 - lon1);
    const a = Math.sin(deltaLat / 2) ** 2 + Math.cos(radians(lat1)) * Math.cos(radians(lat2)) * Math.sin(deltaLon / 2) ** 2;
    return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  function startHeroDestinationRotation() {
    const postcard = document.querySelector(".hero-postcard");
    const slides = Object.values(destinationLibrary).filter((destination) => destination.photo);
    if (!postcard || !slides.length) return;

    slides.forEach((destination) => {
      const preload = new Image();
      preload.src = destination.photo.src;
    });

    postcard.addEventListener("mouseenter", () => { heroRotationPaused = true; });
    postcard.addEventListener("mouseleave", () => { heroRotationPaused = false; });
    postcard.addEventListener("focusin", () => { heroRotationPaused = true; });
    postcard.addEventListener("focusout", () => { heroRotationPaused = false; });

    renderHeroDestination(slides[heroRotationIndex]);
    if (slides.length === 1) return;

    window.setInterval(() => {
      if (document.hidden || heroRotationPaused) return;
      heroRotationIndex = (heroRotationIndex + 1) % slides.length;
      renderHeroDestination(slides[heroRotationIndex]);
    }, 6000);
  }

  function renderHeroDestination(info) {
    const image = byId("heroDestinationImage");
    const credit = byId("heroPhotoCredit");
    byId("heroDestinationName").textContent = localizedDestinationName(info.name);
    byId("heroDestinationMood").textContent = info.character;
    if (info.photo) {
      image.src = info.photo.src;
      image.alt = info.photo.alt;
      image.classList.remove("hidden");
      credit.href = info.photo.page;
      credit.textContent = `Photo: ${info.photo.credit} · Unsplash`;
      credit.classList.remove("hidden");
    } else {
      image.classList.add("hidden");
      credit.classList.add("hidden");
    }
  }

  function buildProfileTags(profile = {}) {
    const paceLabels = { slow: "Slow mornings", balanced: "Balanced pace", active: "Full days" };
    const structureLabels = { spontaneous: "Spontaneous", balanced: "Key anchors", structured: "Well planned" };
    const crowdLabels = { timed: "Low-crowd timing", avoid: "Quiet alternatives", iconic: "Iconic sights" };
    const interestLabels = {
      food: "Local food",
      culture: "Culture",
      architecture: "Architecture",
      nature: "Nature",
      nightlife: "Nightlife",
      shopping: "Shopping",
      wellness: "Wellness",
      family: "Family time",
      event: "Shows & events",
    };
    const labels = [
      paceLabels[profile.pace],
      structureLabels[profile.structure],
      crowdLabels[profile.crowds],
      ...(profile.interests || []).map((value) => interestLabels[value]),
    ].filter(Boolean);
    return [...new Set(labels)].slice(0, 6);
  }

  function savePreferenceProfile() {
    const profile = {
      pace: state.preferences.pace,
      structure: state.preferences.structure,
      crowds: state.preferences.crowds,
      interests: [...document.querySelectorAll(".interest-picker input:checked")].map((input) => input.value),
      mobility: byId("plannerMobility").value,
      dietary: byId("plannerDietary").value.trim(),
    };
    try { localStorage.setItem(storageKeys.profile, JSON.stringify(profile)); } catch { /* Continue without persistence. */ }
  }

  function restorePreferenceProfile() {
    try {
      const profile = JSON.parse(localStorage.getItem(storageKeys.profile) || "null");
      if (!profile) return;
      ["pace", "structure", "crowds"].forEach((question) => selectConceptAnswer(question, profile[question] || "balanced"));
      document.querySelectorAll(".interest-picker input").forEach((input) => { input.checked = profile.interests?.includes(input.value) || false; });
      byId("plannerMobility").value = profile.mobility || "none";
      byId("plannerDietary").value = profile.dietary || "";
    } catch { /* Ignore invalid local profile data. */ }
  }

  function readTrips() {
    try {
      const parsed = JSON.parse(localStorage.getItem(storageKeys.trips) || "[]");
      return Array.isArray(parsed) ? parsed.filter((trip) => trip && typeof trip.id === "string") : [];
    } catch { return []; }
  }

  function writeTrips(trips) {
    try { localStorage.setItem(storageKeys.trips, JSON.stringify(trips.slice(0, 50))); } catch { /* Continue without persistence. */ }
  }

  function upsertTrip(trip) {
    const trips = readTrips();
    const index = trips.findIndex((candidate) => candidate.id === trip.id);
    const clone = JSON.parse(JSON.stringify(trip));
    if (index >= 0) trips[index] = clone;
    else trips.unshift(clone);
    writeTrips(trips);
  }

  function isTripSaved(id) {
    return readTrips().some((trip) => trip.id === id);
  }

  async function copyShareLink() {
    const link = `${window.location.href.split("#")[0]}#trip-${encodeURIComponent(state.currentTrip?.destination || "plan")}`;
    try {
      await navigator.clipboard.writeText(link);
      showToast(t("linkCopied"));
    } catch {
      showToast(t("linkCopyFailed"));
    }
  }

  function applyPlannerCopy(language) {
    document.querySelectorAll("[data-planner-copy]").forEach((element) => {
      const key = element.dataset.plannerCopy;
      if (copy[language]?.[key]) element.textContent = copy[language][key];
    });
    document.querySelectorAll("[data-planner-placeholder]").forEach((element) => {
      const key = element.dataset.plannerPlaceholder;
      if (copy[language]?.[key]) element.placeholder = copy[language][key];
    });
    renderDestinationSuggestions(language);
    localizeDestinationFields(language);
    renderCommunityTrips();
  }

  function renderDestinationSuggestions(language) {
    const suggestions = byId("destinationSuggestions");
    if (!suggestions) return;
    const key = language === "he" ? "he" : "en";
    suggestions.innerHTML = [...destinationCatalog]
      .sort((left, right) => left[key].localeCompare(right[key], language === "he" ? "he" : "en"))
      .map((destination) => `<option value="${escapeHtml(destination[key])}"></option>`)
      .join("");
  }

  function localizeDestinationFields(language) {
    ["quickDestination", "plannerDestination"].forEach((id) => {
      const input = byId(id);
      if (input?.value.trim()) input.value = localizedDestinationName(input.value, language);
    });
    state.routeStops.forEach((stop) => {
      if (stop.city.trim()) stop.city = localizedDestinationName(stop.city, language);
    });
    const heroDestinationName = byId("heroDestinationName");
    if (heroDestinationName?.textContent.trim()) {
      heroDestinationName.textContent = localizedDestinationName(heroDestinationName.textContent, language);
    }
  }

  function t(key) {
    const language = document.documentElement.lang === "he" ? "he" : "en";
    return copy[language]?.[key] || copy.en[key] || key;
  }

  function formatDate(value, language = "en") {
    if (!value) return "Dates not set";
    const date = new Date(`${value}T12:00:00`);
    if (Number.isNaN(date.getTime())) return value;
    return new Intl.DateTimeFormat(language === "he" ? "he-IL" : "en-GB", { day: "numeric", month: "short", year: "numeric" }).format(date);
  }

  function groupLabel(group, companions) {
    if (companions) return companions;
    const labels = { solo: "Solo traveler", couple: "Two travelers", friends: "Friends", family: "Family", multigenerational: "Multi-generational group" };
    return labels[group] || "Travel group";
  }

  function capitalize(value) {
    const text = String(value || "");
    return text ? text.charAt(0).toUpperCase() + text.slice(1) : "";
  }

  function showError(element, message) {
    element.textContent = message;
    element.classList.remove("hidden");
  }

  function hideError(element) {
    element.textContent = "";
    element.classList.add("hidden");
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.remove("hidden");
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => toast.classList.add("hidden"), 2600);
  }

  function refreshIcons() {
    window.lucide?.createIcons();
  }

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]);
  }
})();
