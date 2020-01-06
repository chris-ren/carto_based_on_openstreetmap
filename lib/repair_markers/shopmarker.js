// Sub-groups
// var repairSectionSubGroup;
var boutiqueProfessionnelleSubGroup;
var boiteADonOuLivreSubGroup;
// var computerSubGroup;
var boutiqueAssociativeSubGroup;
var depotVenteSubGroup;
// var smallElectronicsDevicesSubGroup;

// List of managed shops
var WorkshopEnum = {
  // REPAIR: 1,
  BOUTIQUE_PRO: 1,
  BOITE_A_DON_OU_LIVRE: 2,
  // COMPUTERS: 3,
  BOUTIQUE_ASSOCIATIVE: 3,
  DEPOT_VENTE: 4,
  // SMALLELECTRONICSDEVICES: 6,
  properties: {}
};

/**
 * Initialize the sub-groups to add them to the given map
 */
function initSubGroups(map) {
  // Add the cluster
  var cluster = new L.MarkerClusterGroup({
    maxClusterRadius: 50
  });
  cluster.addTo(map);

  // Create sub-groups
  // repairSectionSubGroup = L.featureGroup.subGroup(cluster).addTo(map);
  boutiqueProfessionnelleSubGroup = L.featureGroup.subGroup(cluster).addTo(map);
  boiteADonOuLivreSubGroup = L.featureGroup.subGroup(cluster).addTo(map);
  //    computerSubGroup = L.featureGroup.subGroup(cluster).addTo(map);
  boutiqueAssociativeSubGroup = L.featureGroup.subGroup(cluster).addTo(map);
  depotVenteSubGroup = L.featureGroup.subGroup(cluster).addTo(map);
  //    smallElectronicsDevicesSubGroup = L.featureGroup.subGroup(cluster).addTo(map);


  // and add them to the control
  L.control.layers(null, null, {
      collapsed: true
    })
    // .addOverlay(repairSectionSubGroup, 'Ateliers de co-réparation'+getIconForControlLayer(repairIconUrl))
    .addOverlay(boutiqueProfessionnelleSubGroup, 'Boutique professionnelle' + getIconForControlLayer(boutiqueProfessionnelleIconUrl))
    .addOverlay(boiteADonOuLivreSubGroup, 'Boîte à don ou à livres' + getIconForControlLayer(boiteADonOuLivreIconUrl))
    //  .addOverlay(computerSubGroup, 'Ordinateurs'+getIconForControlLayer(computersIconUrl))
    .addOverlay(boutiqueAssociativeSubGroup, 'Boutique associative' + getIconForControlLayer(boutiqueAssociativeIconUrl))
    .addOverlay(depotVenteSubGroup, 'Dépôt-vente' + getIconForControlLayer(depotVentesIconUrl))
    //  .addOverlay(smallElectronicsDevicesSubGroup, 'Petit appareils électroniques'+getIconForControlLayer(smallElectronicsDevicesIconUrl))
    .addTo(map);

  WorkshopEnum.properties = {
    /// 1: {icon: repairIcon, titlePrefix: 'Ateliers de co-réparation', group: repairSectionSubGroup},
    1: {
      icon: boutiqueProfessionnelleIcon,
      titlePrefix: 'Boutique professionnelle',
      group: boutiqueProfessionnelleSubGroup
    },
    2: {
      icon: boiteADonOuLivreIcon,
      titlePrefix: 'Boîte à don ou à livres',
      group: boiteADonOuLivreSubGroup
    },
    // 3: {icon: computersIcon, titlePrefix: 'Ordinateurs', group: computerSubGroup},
    3: {
      icon: boutiqueAssociativeIcon,
      titlePrefix: 'Boutique associative',
      group: boutiqueAssociativeSubGroup
    },
    4: {
      icon: depotVentesIcon,
      titlePrefix: 'Dépôt-ventes',
      group: depotVenteSubGroup
    },
    //6: {icon: smallElectronicsDevicesIcon, titlePrefix: 'Petit appareils électroniques', group: smallElectronicsDevicesSubGroup},
  };
}


/**
 * Generate an HTML formatted picto for the control layer using the given url
 */
function getIconForControlLayer(url) {
  return '<img src="' + url + '" height="30px" style="margin-left: 2px; margin-right: 2px;"/>';
}

/**
 * Add a marker on the map with the style matching each type
 * @param typeArray the types of shop
 * @param popup the text HTML formatted to display in the popup
 * @param lat the latitude of the marker
 * @param lon the longitude of the marker
 **/
function addMarkerToMap(typeArray, popup, lat, lon) {
  typeArray.forEach(function(item, index, array) {
    // Create icon depending on the shop type
    var icon = {
      icon: WorkshopEnum.properties[item].icon
    };
    // Add marker and popup to the cluser
    L.marker(new L.latLng(lat, lon), icon)
      .bindPopup(popup)
      .addTo(WorkshopEnum.properties[item].group);
  });
}

/**
 * Transform OpenStreetMap hours into french readable hours
 **/
function getReadableHours(opening_hours) {
  return opening_hours
    .replace("Jan", "Janvier").replace("Feb", "Février").replace("Mar", "Mars").replace("Apr", "Avril").replace("May", "Mai").replace("Jun", "Juin").replace("Jul", "Juillet").replace("Aug", "Août").replace("Sep", "Septembre").replace("Oct", "Octobre").replace("Nov", "Novembre").replace("Dec", "Décembre")
    .replace("Mo[1]", "Le 1er lundi du mois").replace("Tu[1]", "Le 1er mardi du mois").replace("We[1]", "Le 1er mercredi du mois").replace("Th[1]", "Le 1er jeudi du mois").replace("Fr[1]", "Le 1er vendredi du mois").replace("Sa[1]", "Le 1er samedi du mois").replace("Su[1]", "Le 1er dimanche du mois")
    .replace("Mo[2]", "Le 2ème lundi du mois").replace("Tu[2]", "Le 2ème mardi du mois").replace("We[2]", "Le 2ème mercredi du mois").replace("Th[2]", "Le 2ème jeudi du mois").replace("Fr[2]", "Le 2ème vendredi du mois").replace("Sa[2]", "Le 2ème samedi du mois").replace("Su[2]", "Le 2ème dimanche du mois")
    .replace("Mo[3]", "Le 3ème lundi du mois").replace("Tu[3]", "Le 3ème mardi du mois").replace("We[3]", "Le 3ème mercredi du mois").replace("Th[3]", "Le 3ème jeudi du mois").replace("Fr[3]", "Le 3ème vendredi du mois").replace("Sa[3]", "Le 3ème samedi du mois").replace("Su[3]", "Le 3ème dimanche du mois")
    .replace("Mo[4]", "Le 4ème lundi du mois").replace("Tu[4]", "Le 4ème mardi du mois").replace("We[4]", "Le 4ème mercredi du mois").replace("Th[4]", "Le 4ème jeudi du mois").replace("Fr[4]", "Le 4ème vendredi du mois").replace("Sa[4]", "Le 4ème samedi du mois").replace("Su[4]", "Le 4ème dimanche du mois")
    .replace("Mo[-1]", "Le dernier lundi du mois").replace("Tu[-1]", "Le dernier mardi du mois").replace("We[-1]", "Le dernier mercredi du mois").replace("Th[-1]", "Le dernier jeudi du mois").replace("Fr[-1]", "Le dernier vendredi du mois").replace("Sa[-1]", "Le dernier samedi du mois").replace("Su[-1]", "Le dernier dimanche du mois")
    .replace("Mo", "Lundi").replace("Tu", "Mardi").replace("We", "Mercredi").replace("Th", "Jeudi").replace("Fr", "Vendredi").replace("Sa", "Samedi").replace("Su", "Dimanche")
    .replace(/off/gi, "fermé")
    .replace(/,/g, " & ")
    .replace(/;/g, ", ");
}

/**
 * Get the type of shop/amenity
 */
function getType(name, shopTag, amenityTag, craftTag) {
  var type = null;

  if (shopTag) {
    type = getTypeForShop(shopTag);
  } else if (amenityTag) {
    type = getTypeForAmenity(amenityTag);
  } else if (craftTag) {
    type = getTypeForCraft(craftTag);
  }

  if (!type) {
    console.log("Unknown shop type with name=" + name + " ; shopTag=" + shopTag + " ; craftTag=" + craftTag + " and amenityTag=" + amenityTag + " ; type=" + type);
    type = null;
  }

  return type;
}


/**
 * Get the types of repair workshop
 */
function getTypeShop(charity, amenity) {
  var typeArray = [];

  if (amenity === "public_bookcase" || amenity === "givebox") {
    typeArray.push(WorkshopEnum.BOITE_A_DON_OU_LIVRE);
  } else if (amenity === "deposit_sale") {
    typeArray.push(WorkshopEnum.DEPOT_VENTE);
  } else if (charity === "yes") {
    typeArray.push(WorkshopEnum.BOUTIQUE_ASSOCIATIVE);
  } else if (typeArray.length == 0) {
    typeArray.push(WorkshopEnum.BOUTIQUE_PRO);
  }

  return typeArray;
}
/**
 * Parse a shop tag into a WorkshopEnum
 * @param shopTag the tag identifying the shop
 * @return the type of building as a WorkshopEnum
 */
function getTypeForShop(shopTag) {
  var type = null;

  switch (shopTag) {
    case "convenience":

      break;
    case "supermarket":
      type = WorkshopEnum.SUPERMARKET;
      break;
    case "butcher":
      type = WorkshopEnum.BUTCHER;
      break;
    case "dairy":
    case "cheese":
      type = WorkshopEnum.DAIRY;
      break;
    case "greengrocer":
      type = WorkshopEnum.GREENGROCER;
      break;
  }

  return type;
}

/**
 * Parse an amenity tag into a WorkshopEnum
 * @param shopTag the tag identifying the amenity
 * @return the type of building as a WorkshopEnum
 */
function getTypeForAmenity(amenityTag) {
  var type = null;

  switch (amenityTag) {
    case "association":
      type = WorkshopEnum.FAST_FOOD;
      break;
    case "restaurant":
      type = WorkshopEnum.RESTAURANT;
      break;
    case "cafe":
      type = WorkshopEnum.CAFE;
      break;
  }

  return type;
}

/**
 * Parse a craft tag into a WorkshopEnum
 * @param shopTag the tag identifying the craft
 * @return the type of building as a WorkshopEnum
 */
function getTypeForCraft(craftTag) {
  var type = null;

  switch (craftTag) {
    case "caterer":
      type = WorkshopEnum.CATERER;
      break;
  }

  return type;
}


/**
 * @return an HTML formatted website link
 */
function getHtmlFormattedWebsite(name, website) {
  if (!website) {
    return "";
  }

  return '<a href="' + website + '" target="_blank">' + name + '</a><br />';
}

/**
 * @return an HTML formatted opening hours text
 */
function getHtmlFormattedHours(opening_hours) {
  var hours = "";

  if (!opening_hours) {
    return hours;
  }

  hours += '<b>Horaires</b><br />';
  var hoursSplit = opening_hours.split(';');

  for (var hoursIndex in hoursSplit) {
    hours += getReadableHours(hoursSplit[hoursIndex]) + '<br />';
  }

  return hours;
}

/**
 * @return an HTML formatted address
 */
function getHtmlFormattedAddress(housenumber, housenumber2, street, street2, postcode2, postcode, city, city2) {
  var address = "";

  if (street && housenumber) {
    address += housenumber + ' ' + street + '<br />';
  } else if (street) {
    address += street + '<br />';
  }

    if (street2 && housenumber2) {
      address += housenumber2 + ' ' + street2 + '<br />';
    } else if (street2) {
      address += street2 + '<br />';
    }

  if (city && postcode) {
    address += postcode + ' ' + city + '<br />';
  } else if (city) {
    address += city + '<br />';
  }

    if (city2 && postcode2) {
      address += postcode2 + ' ' + city2 + '<br />';
    } else if (city2) {
      address += city2 + '<br />';
    }

  return address;
}


/**
 * @return an HTML formatted image
 */
function getHtmlFormattedImage(image, mapillary) {
  var result = "";
  if (image) {
    // width='200px'
    result = "<img src='" + image + "' style='width=60%;max-width:60%;height:auto' align='left'/>";
  } else if (mapillary) {
    // width='200px'
    result = "<img src='https://d1cuyjsrcm0gby.cloudfront.net/" + mapillary + "/thumb-640.jpg' style='width=60%;max-width:60%;height:auto'  align='left' />";
  }
  return result;
}

/**
 * @param elementId the OpenStreetMap id of the element
 * @param isAWay true if the element is a way, false if it's a node
 * @return an HTML formatted that adds a link for contributions
 */
function getHtmlFormattedContribution(elementId) {
  var baseUrl = "https://openstreetmap.org/node/";
  var contributionHtml = '<hr style="padding-bottom: ;padding-bottom: 0px;" size="1">';
  contributionHtml += '<a href="' + baseUrl + elementId + '" target="_blank" title="Modifier' +
    ' les informations sur OpenStreetMap. Elles seront mises à jour sur cartoccase.fr dans ' +
    'les 24h suivant la modification.">Modifier ces informations</a>';
  return contributionHtml;
}


/**
 * Get a title describing the shop types
 */
function getShopTitle(clothes, books, shop) {
  // Start text with italic style and add prefix depending on type
  var title = "";
  if (shop === "clothes") {
    title = " - vêtements";
  } else if (shop === "books") {
    title = " - livres";
  }
  return title;
}
