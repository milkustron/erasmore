import json
import os
import random
import time
from urllib import request
from typing import List

import requests
from bs4 import BeautifulSoup, Tag, NavigableString

DATA_FOLDER = "../resources/data/"
ASSETS_FOLDER = "../resources/assets/activities"
WEB_DATA_FOLDER = "web_data"
LOCALBIRD_URL = "https://localbirdinternational.com"
EXPERIENCES_URL = f"{LOCALBIRD_URL}/experiences/"


def save_request_to_file(url, filepath, mode="w+", encoding="utf-8"):
    response = requests.get(url)
    with open(filepath, mode, encoding=encoding) as response_file:
        response_file.write(response.text)


def fetch_experiences():
    save_request_to_file(EXPERIENCES_URL, f"{WEB_DATA_FOLDER}/experiences.html")


def fetch_activities(time_between_downloads=60):
    with open(f"{WEB_DATA_FOLDER}/experiences.html", encoding="utf-8") as experiences_file:
        experiences_soup = BeautifulSoup(experiences_file, "html.parser")
        list_elements = experiences_soup.find_all(class_="product")
        for activity in list_elements:
            activity_name = activity.find("h2").text.replace(':', ' -')
            activity_link = activity.find("a")

            print(f"Saving: {activity_name}...")
            storage_path = f"{WEB_DATA_FOLDER}/{activity_name}"
            if not os.path.exists(storage_path):
                os.makedirs(storage_path)
            activity_url = activity_link.attrs.get("href")
            save_request_to_file(activity_url, f"{storage_path}/activity.html")

            time_wait = random.random() * time_between_downloads
            print(f"Sleeping for {time_wait}s...")
            time.sleep(time_wait)


def fetch_thumbnails(time_between_downloads=60):
    with open(f"{WEB_DATA_FOLDER}/experiences.html", encoding="utf-8") as experiences_file:
        experiences_soup = BeautifulSoup(experiences_file, "html.parser")
        list_elements = experiences_soup.find_all(class_="product")
        for activity in list_elements:
            activity_name = activity.find("h2").text.replace(':', ' -')
            thumbnail = activity.find("img")
            thumbnail_src = thumbnail.attrs.get("src")

            storage_path = f"{ASSETS_FOLDER}/{activity_name}"
            if not os.path.exists(storage_path):
                os.makedirs(storage_path)

            try:
                print(f"Fetching thumbnail for: {activity_name}...")
                request.urlretrieve(thumbnail_src, f"{storage_path}/thumbnail.{thumbnail_src.split('.')[-1]}")
            except:
                print(f"ERROR: Failed to retrieve thumbnail for {activity_name}")

            time_wait = random.random() * time_between_downloads
            print(f"Sleeping for {time_wait}s...")
            time.sleep(time_wait)


def fetch_activity_gallery_images(time_between_downloads=60):
    for activity_name in os.listdir(WEB_DATA_FOLDER):
        activity_path = f"{WEB_DATA_FOLDER}/{activity_name}"

        if not os.path.isdir(activity_path):
            continue

        with open(f"{activity_path}/activity.html", encoding="utf-8") as activity_file:
            activity_soup = BeautifulSoup(activity_file, "html.parser")

            gallery_container = activity_soup.find("div", class_="woocommerce-product-gallery")
            gallery_img_containers = activity_soup.find_all("div", class_="woocommerce-product-gallery__image")
            gallery_imgs = gallery_container.find_all("img")

            if not gallery_img_containers or not gallery_imgs:
                print(f"No gallery imgs found for {activity_name}")
                return

            gallery_img_links = [img["src"] for img in gallery_imgs]
            gallery_thumb_links = [container["data-thumb"] for container in gallery_img_containers]
            gallery_img_folder = f"{ASSETS_FOLDER}/{activity_name}/gallery"
            if not os.path.exists(gallery_img_folder):
                os.makedirs(gallery_img_folder)

            try:
                main_img_link = gallery_img_links[0]
                request.urlretrieve(main_img_link, f"{gallery_img_folder}/main.{main_img_link.split('.')[-1]}")
            except:
                print(f"ERROR: Failed to retrieve main img for {activity_name}")
            try:
                main_thumb_link = gallery_thumb_links[0]
                request.urlretrieve(main_thumb_link, f"{gallery_img_folder}/main_thumb.{main_thumb_link.split('.')[-1]}")
            except:
                print(f"ERROR: Failed to retrieve main img thumbnail for {activity_name}")

            fetch_img_from_links(gallery_img_links[1:], gallery_img_folder, time_between_downloads)
            fetch_img_from_links(gallery_thumb_links[1:], gallery_img_folder, time_between_downloads)


def fetch_img_from_links(link_list, storage_path, time_between_downloads=60):
    for link in link_list:
        img_name = link.split("/")[-1]
        path_to_img = f"{storage_path}/{img_name}"

        try:
            print(f"Fetching: {img_name} ...")
            request.urlretrieve(link, path_to_img)
        except:
            print(f"ERROR: Failed to retrieve {img_name}")

        time_wait = random.random() * time_between_downloads
        print(f"Sleeping for {time_wait}s...")
        time.sleep(time_wait)


def generate_activity_json():
    activities_dict = dict()
    for activity_name in os.listdir(WEB_DATA_FOLDER):
        activity_path = f"{WEB_DATA_FOLDER}/{activity_name}"
        if not os.path.isdir(activity_path):
            continue
        activities_dict[activity_name] = dict()
        with open(f"{activity_path}/activity.html", encoding="utf-8") as activity_file:
            activity_soup = BeautifulSoup(activity_file, "html.parser")
            activities_dict[activity_name]["description_fields"] = parse_activity_data(activity_soup)
            activities_dict[activity_name]["tags"] = parse_activity_tags(activity_soup)
    with open(f"{DATA_FOLDER}/activities.json", "w+", encoding="utf-8") as activities_json:
        json.dump(activities_dict, activities_json, indent=4)


def parse_activity_data(activity_soup):
    description_container = activity_soup.find(id="tab-description")

    # For security all script tags are removed
    scripts = description_container.find_all("script")
    for script in scripts:
        script.extract()

    description_header = description_container.find("h2")
    if description_header:
        for parent in description_header.parents:
            if "elementor-widget-container" in parent.attrs.get("class", []):
                return parse_activity_description(parent)
    return parse_activity_description(description_container)


def parse_activity_description(raw_activity_data) -> dict:
    activity_fields = dict()

    section_titles = raw_activity_data.find_all("h3")
    closest_ancestor = None
    for section_title in section_titles:
        if closest_ancestor is None or section_title.parent in closest_ancestor.parents:
            closest_ancestor = section_title.parent

    description_header = raw_activity_data.find("h2")
    if description_header:
        activity_fields["Description"] = gather_tag_siblings(description_header, "h3", closest_ancestor)
    else:
        activity_fields["Description"] = [element for element in raw_activity_data.find("h3").previous_siblings
                                          if isinstance(element, Tag)]

    for section_title in section_titles:
        field_name = section_title.text
        if "Policy" in field_name:
            break
        activity_fields[field_name] = gather_tag_siblings(section_title, "h3", closest_ancestor)

    return clean_fields(activity_fields)


def gather_tag_siblings(start_tag, stop_tag, closest_ancestor) -> list:
    elements = list()
    for sibling in start_tag.next_siblings:
        if isinstance(sibling, NavigableString):
            elements.append(sibling)
            continue
        if sibling.name == stop_tag:
            return elements
        stop_tag_element = sibling.find(stop_tag)
        if stop_tag_element:
            elements.extend(stop_tag_element.previous_siblings)
            return elements
        elements.append(sibling)
    if start_tag.parent != closest_ancestor:
        elements.extend(gather_tag_siblings(start_tag.parent, stop_tag, closest_ancestor))
    return elements


def clean_fields(activity_fields) -> dict:
    for field, elements in activity_fields.items():
        activity_fields[field] = "".join([clean_element(element) for element in elements])
    return activity_fields


def clean_element(element) -> str:
    if isinstance(element, NavigableString):
        return element
    for br in element.find_all("br"):
        br.replace_with("\n")
    if element.name == "ul":
        items = element.find_all("li")
        return "".join([f"{item.text}\n" for item in items])
    for ul in element.find_all("ul"):
        items = ul.find_all("li")
        ul.replace_with("".join([f"{item.text}\n" for item in items]))
    return element.text


def parse_activity_tags(activity_soup) -> List[str]:
    tag_container = activity_soup.find("span", class_="tagged_as")
    return [link.text for link in tag_container.find_all("a")]


if __name__ == '__main__':
    # These functions fetch data from the website
    # All of them have a "time_between_downloads" parameter.
    # After each download the scrapper will sleep from 0 to time_between_downloads seconds
    # By default "time_between_downloads" is 60 seconds

    # fetch_experiences()
    # fetch_activities()
    # fetch_thumbnails(time_between_downloads=120)
    # fetch_activity_gallery_images(time_between_downloads=120)


    # This generates json from all the downloaded html
    generate_activity_json()
