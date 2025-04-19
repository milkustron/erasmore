import json
import os
import random
import time
from urllib import request
from typing import List

import requests
from bs4 import BeautifulSoup, Tag, NavigableString

RAW_DATA_FOLDER = "raw_data"
DATA_FOLDER = "../resources/data/"
LOCALBIRD_URL = "https://localbirdinternational.com"
EXPERIENCES_URL = f"{LOCALBIRD_URL}/experiences/"


def save_request_to_file(url, filepath, mode="w+", encoding="utf-8"):
    response = requests.get(url)
    with open(filepath, mode, encoding=encoding) as response_file:
        response_file.write(response.text)


def fetch_experiences():
    save_request_to_file(EXPERIENCES_URL, f"{RAW_DATA_FOLDER}/experiences.html")


def fetch_activities():
    with open(f"{RAW_DATA_FOLDER}/experiences.html", encoding="utf-8") as experiences_file:
        experiences_soup = BeautifulSoup(experiences_file, "html.parser")
        list_elements = experiences_soup.find_all(class_="product")
        for activity in list_elements:
            activity_name = activity.find("h2").text.replace(':', ' -')
            activity_link = activity.find("a")

            print(f"Saving: {activity_name}...")
            storage_path = f"{RAW_DATA_FOLDER}/{activity_name}"
            if not os.path.exists(storage_path):
                os.makedirs(storage_path)
            activity_url = activity_link.attrs.get("href")
            save_request_to_file(activity_url, f"{storage_path}/activity.html")

            time_wait = random.random() * 120
            print(f"Sleeping for {time_wait}s...")
            time.sleep(time_wait)
    

def fetch_thumbnails():
    with open(f"{RAW_DATA_FOLDER}/experiences.html", encoding="utf-8") as experiences_file:
        experiences_soup = BeautifulSoup(experiences_file, "html.parser")
        list_elements = experiences_soup.find_all(class_="product")
        for activity in list_elements:
            activity_name = activity.find("h2").text.replace(':', ' -')
            thumbnail = activity.find("img")
            thumbnail_src = thumbnail.attrs.get("src")
            
            print(f"Saving: {activity_name}...")
            storage_path = f"{RAW_DATA_FOLDER}/{activity_name}"
            if not os.path.exists(storage_path):
                os.makedirs(storage_path)
            request.urlretrieve(thumbnail_src, f"{storage_path}/thumbnail.png")

            time_wait = random.random() * 120
            print(f"Sleeping for {time_wait}s...")
            time.sleep(time_wait)


def parse_activities():
    activities_dict = dict()
    for activity_name in os.listdir(RAW_DATA_FOLDER):
        activity_path = f"{RAW_DATA_FOLDER}/{activity_name}"
        if os.path.isdir(activity_path):
            activities_dict[activity_name] = dict()
            with open(f"{activity_path}/activity.html", encoding="utf-8") as activity_file:
                activity_soup = BeautifulSoup(activity_file, "html.parser")
                activities_dict[activity_name]["description_fields"] = parse_activity_data(activity_soup)
                activities_dict[activity_name]["tags"] = parse_activity_tags(activity_soup)
                activities_dict[activity_name]["gallery"] = parse_activity_gallery_links(activity_soup, activity_path)
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
                return parse_activity_fields(parent)
    return parse_activity_fields(description_container)


def parse_activity_fields(raw_activity_data) -> dict:
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
    return element.text


def parse_activity_tags(activity_soup) -> List[str]:
    tag_container = activity_soup.find("span", class_="tagged_as")
    return [link.text for link in tag_container.find_all("a")]


def parse_activity_gallery_links(activity_soup, activity_path) -> List[str]:
    gallery_container = activity_soup.find("div", class_="woocommerce-product-gallery")
    gallery_imgs = gallery_container.find_all("img")
    gallery_img_containers = activity_soup.find_all("div", class_="woocommerce-product-gallery__image")
    gallery_img_links = [img["src"] for img in gallery_imgs]
    gallery_img_links += [container["data-thumb"] for container in gallery_img_containers]
    gallery_img_folder = f"{activity_path}/assets"
    gallery_images = list()
    for link in gallery_img_links:
        img_name = link.split("/")[-1]
        path_to_img = f"{gallery_img_folder}/{img_name}"
        gallery_images.append(path_to_img)
    return gallery_images


def fetch_activity_gallery_images():
    activities_dict = dict()
    for activity_name in os.listdir(RAW_DATA_FOLDER):
        activity_path = f"{RAW_DATA_FOLDER}/{activity_name}"
        if os.path.isdir(activity_path):
            with open(f"{activity_path}/activity.html", encoding="utf-8") as activity_file:
                activity_soup = BeautifulSoup(activity_file, "html.parser")
                gallery_container = activity_soup.find("div", class_="woocommerce-product-gallery")
                gallery_imgs = gallery_container.find_all("img")
                gallery_img_containers = activity_soup.find_all("div", class_="woocommerce-product-gallery__image")
                gallery_img_links = [img["src"] for img in gallery_imgs]
                gallery_img_links += [container["data-thumb"] for container in gallery_img_containers]

                gallery_img_folder = f"{activity_path}/assets"
                if not os.path.exists(gallery_img_folder):
                    os.makedirs(gallery_img_folder)

                for link in gallery_img_links:
                    img_name = link.split("/")[-1]
                    path_to_img = f"{gallery_img_folder}/{img_name}"
                    print(f"Fetching: {img_name} ...")
                    request.urlretrieve(link, path_to_img)
                    time_wait = random.random() * 60
                    print(f"Sleeping for {time_wait}s...")
                    time.sleep(time_wait)


if __name__ == '__main__':
    # These functions fetch data from the website

    # fetch_experiences()
    # fetch_activities()
    # fetch_thumbnails()
    # fetch_activity_gallery_images()

    # This generates json from all the downloaded html
    generate_activity_json()
